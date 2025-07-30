import express from "express";
import cors from "cors";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { readFile } from "fs/promises";

import env from "./utils/env.js";
import cookieParser from "cookie-parser";
import initMongoConnection from "./db/initMongoConnection.js";

import { unifiedusersCollection } from "./db/models/unifiedusers.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import {
  createunifieduser,
  updateunifieduserById,
} from "./services/unifiedusers.js";
import { sendTicket } from "./utils/sendTicket.js";
import { utmTracker } from "./middlewares/utmMarks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const promoPath = resolve(__dirname, "db", "promoCodes.json");

await initMongoConnection();

const app = express();

const allowedOrigins = [
  "https://warsawkod.women.place",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.1.2.205:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(utmTracker);
app.use("/api", router);

const monoBankToken = env("MONOBANK_TOKEN");

// ---------- Получение курса PLN→UAH из разных источников ----------
async function getPLNtoUAHRateFromPrivat() {
  const { data } = await axios.get(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
  );
  const pln = data.find(
    (entry) => entry.ccy === "PLN" && entry.base_ccy === "UAH"
  );
  if (!pln) throw new Error("PrivatBank: Курс PLN→UAH не найден");
  return parseFloat(pln.sale);
}

async function getPLNtoUAHRateFromNBU() {
  const { data } = await axios.get(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=PLN&json"
  );
  if (!data.length || !data[0].rate)
    throw new Error("NBU: Курс PLN→UAH не найден");
  return data[0].rate;
}

async function getPLNtoUAHRate() {
  try {
    return await getPLNtoUAHRateFromPrivat();
  } catch (e1) {
    console.warn("⚠️ PrivatBank API не работает:", e1.message);
    try {
      return await getPLNtoUAHRateFromNBU();
    } catch (e2) {
      console.warn("⚠️ NBU API не работает:", e2.message);
      throw new Error("Курс PLN→UAH недоступен ни из одного источника");
    }
  }
}

// ---------- Создание платежа ----------
app.post("/api/create-payment", async (req, res) => {
  const { user, purchase, utmMarks } = req.body;

  if (!user || !purchase) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (purchase.promoCode) {
    try {
      const file = await readFile(promoPath, "utf-8");
      const promoCodes = JSON.parse(file);
      const promo = promoCodes.find((p) => p.code === purchase.promoCode);

      if (!promo) {
        return res.status(400).json({ error: "Промокод недійсний" });
      }
      if (promo.used) {
        return res.status(400).json({ error: "Промокод уже використаний" });
      }
    } catch (err) {
      console.error("Ошибка при проверке промокода:", err);
      return res.status(500).json({ error: "Ошибка при проверке промокода" });
    }
  }

  try {
    const unifieduser = await createunifieduser({ user, purchase, utmMarks });

    const rate = await getPLNtoUAHRate();
    const convertedAmount = Math.round(purchase.totalAmount * rate * 100);
    console.log(
      `💱 Курс PLN→UAH: ${rate}, сумма: ${purchase.totalAmount} PLN → ${
        convertedAmount / 100
      } UAH`
    );

    const redirectUrl = `https://warsawkod.women.place/thank-you/${unifieduser._id}`;
    const response = await axios.post(
      "https://api.monobank.ua/api/merchant/unifieduser/create",
      {
        amount: convertedAmount,
        ccy: 980,
        redirectUrl,
        webHookUrl: "https://warsawkod.women.place/api/payment-callback",
      },
      {
        headers: {
          "X-Token": monoBankToken,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentData = {
      unifieduserId: response.data.unifieduserId,
      status: "pending",
    };

    await updateunifieduserById(unifieduser._id, { paymentData });

    res.status(200).json({
      unifieduserId: response.data.unifieduserId,
      pageUrl: response.data.pageUrl,
    });
  } catch (error) {
    console.error("Ошибка при создании оплаты:", error.message);
    res.status(500).json({
      error: "Failed to create payment",
      message: error.message,
    });
  }
});

// ---------- Callback MonoBank ----------
app.post("/api/payment-callback", async (req, res) => {
  const { unifieduserId, status } = req.body;
  console.log("Received payment callback:", {
    unifieduserId,
    status,
    timestamp: new Date().toISOString(),
  });

  if (!unifieduserId || !status) {
    return res.status(400).json({ error: "Missing unifieduserId or status" });
  }

  try {
    const unifieduser = await unifiedusersCollection.findOne({
      "paymentData.unifieduserId": unifieduserId,
    });

    if (!unifieduser) {
      console.log("unifieduser not found for unifieduserId:", unifieduserId);
      return res.status(404).json({ error: "unifieduser not found" });
    }

    const statusMap = {
      success: "paid",
      pending: "pending",
    };

    unifieduser.paymentData.status = statusMap[status] || "failed";
    await updateunifieduserById(unifieduser._id, unifieduser);

    // ✅ Если платеж успешен — помечаем промокод как использованный
    if (status === "success" && unifieduser.purchase.promoCode) {
      try {
        const file = await readFile(promoPath, "utf-8");
        const promoCodes = JSON.parse(file);
        const promoIndex = promoCodes.findIndex(
          (p) => p.code === unifieduser.purchase.promoCode && !p.used
        );

        if (promoIndex !== -1) {
          promoCodes[promoIndex].used = true;
          const { writeFile } = await import("fs/promises");
          await writeFile(promoPath, JSON.stringify(promoCodes, null, 2));
          console.log(
            `✅ Промокод ${promoCodes[promoIndex].code} помечен как использованный`
          );
        }
      } catch (err) {
        console.error("⚠️ Не удалось обновить статус промокода:", err);
      }
    }

    res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    console.error("Error in payment-callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------- Статика и SPA ----------
const staticFilesPath = join(__dirname, "../");

app.use(
  express.static(staticFilesPath, {
    setHeaders: (res, path) => {
      if (/\.(webp|jpg|png|gif)$/.test(path)) {
        res.setHeader("Cache-Control", "public, max-age=31536000");
      }
    },
  })
);

app.get("/*", (req, res) => {
  res.sendFile(join(staticFilesPath, "index.html"));
});

app.use(errorHandler);

const PORT = 3000;
const HOST = "127.1.5.121";

import "./telegram/bot.js";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
