import express from "express";
import cors from "cors";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import env from "./utils/env.js";
import cookieParser from "cookie-parser";
import initMongoConnection from "./db/initMongoConnection.js";

import { InvoicesCollection } from "./db/models/invoices.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { createInvoice, updateInvoiceById } from "./services/invoices.js";
import { sendTicket } from "./utils/sendTicket.js";
import { utmTracker } from "./middlewares/utmMarks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

  try {
    // 1. Создание записи в Mongo
    const invoice = await createInvoice({ user, purchase, utmMarks });

    // 2. Получаем курс PLN → UAH
    const rate = await getPLNtoUAHRate();
    const convertedAmount = Math.round(purchase.totalAmount * rate * 100);
    console.log(
      `💱 Курс PLN→UAH: ${rate}, сумма: ${purchase.totalAmount} PLN → ${
        convertedAmount / 100
      } UAH`
    );

    // 3. Ссылки редиректа
    const redirectUrl = `https://warsawkod.women.place/thank-you/${invoice._id}`;
    const response = await axios.post(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        amount: convertedAmount,
        ccy: 980, // UAH
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
      invoiceId: response.data.invoiceId,
      status: "pending",
    };

    await updateInvoiceById(invoice._id, { paymentData });

    res.status(200).json({
      invoiceId: response.data.invoiceId,
      pageUrl: response.data.pageUrl,
    });
  } catch (error) {
    console.error("Ошибка при создании оплаты:", error.message);
    res
      .status(500)
      .json({ error: "Failed to create payment", message: error.message });
  }
});

// ---------- Callback MonoBank ----------
app.post("/api/payment-callback", async (req, res) => {
  const { invoiceId, status } = req.body;
  console.log("Received payment callback:", {
    invoiceId,
    status,
    timestamp: new Date().toISOString(),
  });

  if (!invoiceId || !status) {
    return res.status(400).json({ error: "Missing invoiceId or status" });
  }

  try {
    const invoice = await InvoicesCollection.findOne({
      "paymentData.invoiceId": invoiceId,
    });

    if (!invoice) {
      console.log("Invoice not found for invoiceId:", invoiceId);
      return res.status(404).json({ error: "Invoice not found" });
    }

    const statusMap = {
      success: "paid",
      pending: "pending",
    };

    invoice.paymentData.status = statusMap[status] || "failed";
    await updateInvoiceById(invoice._id, invoice);

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

import './telegram/bot.js'

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
