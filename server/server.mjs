import express from "express";
import cors from "cors";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { readFile, writeFile } from "fs/promises";
import TelegramBot from "node-telegram-bot-api";
import mongoose from "mongoose";
import { unifiedusersCollection } from "./db/models/unifiedusers.js";

import env from "./utils/env.js";
import cookieParser from "cookie-parser";
import initMongoConnection from "./db/initMongoConnection.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import {
  upsertunifieduser,
  updateunifieduserById,
} from "./services/unifiedusers.js";
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
  "http://127.1.2.122:3000",
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
const monoBankRedirectUrl = env(
  "MONOBANK_REDIRECT_URL",
  "https://warsawkod.women.place/thank-you"
);
const monoBankWebhookUrl = env(
  "MONOBANK_WEBHOOK_URL",
  "https://warsawkod.women.place/api/payment-callback"
);

// --- Telegram Bot Integration ---
const BOT_TOKEN = env("BOT_TOKEN");
const WEBHOOK_URL = env("WEBHOOK_URL");
const PORT = env("PORT", 3000);
const HOST = env("HOST", "0.0.0.0");

const bot = new TelegramBot(BOT_TOKEN, { polling: false }); // Используем вебхуки
const adminId = 718830020; // My Telegram ID

const channelLink = "https://t.me/kodzhinky";
const supportLink = "https://t.me/women_psyconference";
const instagramLink =
  "https://www.instagram.com/kod.zhinky?igsh=MXQ5djN3cXBhenQ0bQ==";
const siteLink =
  "https://warsawkod.women.place/?utm_source=Telegram_bot&utm_medium=referral&utm_campaign=telegram_bot";

/**
 * Отправляет информацию о новой заявке администратору через Telegram.
 * @param {{ fullName: string, phone: string, telegram: string, utmParams: { utm_source?: string, utm_medium?: string, utm_campaign?: string } }} formData Данные формы.
 */
export async function sendFormToAdmin({
  fullName,
  phone,
  telegram,
  utmParams = {},
}) {
  const { utm_source, utm_medium, utm_campaign } = utmParams;
  const message = `
📝 <b>Нова заявка з форми</b>

👤 Ім’я: ${fullName}
📞 Телефон: ${phone}
💬 Telegram: ${telegram || "не вказано"}

📊 <b>UTM-мітки</b>
🔹 utm_source: ${utm_source || "—"}
🔹 utm_medium: ${utm_medium || "—"}
🔹 utm_campaign: ${utm_campaign || "—"}
`;
  try {
    await bot.sendMessage(adminId, message, { parse_mode: "HTML" });
  } catch (error) {
    console.error(
      "❌ Не вдалося надіслати повідомлення адміну:",
      error.message
    );
  }
}

// 🔹 Обработка команды /start
bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
  const chatID = msg.chat.id;
  const source = match?.[1] || "unknown";
  const telegramID = msg.from.id.toString();

  const telegramUserName = msg.from.username
    ? msg.from.username.replace(/^@/, "")
    : undefined;

  const telegramUserData = {
    id: telegramID,
    userName: telegramUserName,
    firstName: msg.from.first_name,
    lastName: msg.from.last_name,
    languageCode: msg.from.language_code,
    isPremium: msg.from.is_premium || false,
  };

  try {
    const query = {
      $or: [{ "telegram.id": telegramID }],
    };

    if (telegramUserName) {
      query.$or.push({
        "telegram.userName": {
          $regex: new RegExp(`^${telegramUserName}$`, "i"),
        },
      });
    }

    await unifiedusersCollection.findOneAndUpdate(
      query,
      {
        $set: { telegram: telegramUserData },
        $push: {
          "telegram.transitions": { date: new Date(), source: source },
          "telegram.source": {
            $each: [source],
            $position: 0,
          },
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await bot.sendMessage(
      chatID,
      `Вітаємо, <b>${msg.from.first_name}</b>!✨

Ми раді, що ти тут💛
Це вже більше, ніж просто крок — це шлях до себе.

Щоб ти нічого не пропустила(в):
Вся інформація, бекстейдж, розклад і новини — у нашому Telegram-каналі.

Якщо щось не працює чи маєш питання — натисни на кнопку «Підтримка».

Обіймаємо тебе ще до зустрічі 💛
<b>Команда «Код Жінки»</b>`,
      {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "📢 Канал", url: channelLink },
              { text: "💬 Підтримка", url: supportLink },
            ],
            [
              { text: "Instagram", url: instagramLink },
              { text: "Наш сайт", url: siteLink },
            ],
          ],
        },
      }
    );
  } catch (err) {
    console.error("Error in /start handler:", err);
  }
});

// ✅ Endpoint для Telegram Webhook
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ✅ НОВЫЙ ЭНДПОИНТ для обработки формы с сайта
app.post("/api/submit-helper-form", async (req, res) => {
  const formData = req.body;
  console.log("📥 Получена заявка с сайта:", formData);

  try {
    // 🔹 Вызываем функцию бота, чтобы отправить сообщение админу
    await sendFormToAdmin(formData);
    res.status(200).json({ message: "Заявка успешно отправлена админу." });
  } catch (error) {
    console.error("❌ Ошибка при обработке заявки с сайта:", error);
    res.status(500).json({ error: "Не удалось отправить заявку" });
  }
});

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
app.post("/api/create-payment", async (req, res, next) => {
  const { user, conferences } = req.body;

  if (
    !user ||
    !conferences ||
    !Array.isArray(conferences) ||
    conferences.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Missing required fields or invalid format" });
  }

  const purchase = conferences[0];
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
      return next(new Error(`Ошибка при проверке промокода: ${err.message}`));
    }
  }

  try {
    const totalAmountFromFrontend = purchase.totalAmount;

    if (
      typeof totalAmountFromFrontend !== "number" ||
      totalAmountFromFrontend <= 0
    ) {
      return res.status(400).json({ error: "Некорректная сумма для оплаты" });
    }

    const { unifieduser, conferenceIndex } = await upsertunifieduser({
      user,
      conferences,
    });
    const conferenceId = unifieduser.conferences[conferenceIndex]._id;

    const rate = await getPLNtoUAHRate();
    const convertedAmount = Math.round(totalAmountFromFrontend * rate * 100);
    console.log(
      `💱 Курс PLN→UAH: ${rate}, сумма: ${totalAmountFromFrontend} PLN → ${
        convertedAmount / 100
      } UAH`
    );

    const redirectUrl = `${monoBankRedirectUrl}/${unifieduser._id}/${conferenceId}`;
    const monoResponse = await axios.post(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        amount: convertedAmount,
        ccy: 980,
        redirectUrl,
        webHookUrl: monoBankWebhookUrl,
      },
      {
        headers: {
          "X-Token": monoBankToken,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentData = {
      invoiceId: monoResponse.data.invoiceId,
      status: "pending",
    };

    unifieduser.conferences[conferenceIndex].paymentData = paymentData;

    await updateunifieduserById(unifieduser._id, {
      conferences: unifieduser.conferences,
    });

    res.status(200).json({
      invoiceId: monoResponse.data.invoiceId,
      pageUrl: monoResponse.data.pageUrl,
    });
  } catch (error) {
    console.error("Ошибка при создании оплаты:", error);
    next(error);
  }
});

// ---------- Callback MonoBank ----------
app.post("/api/payment-callback", async (req, res, next) => {
  const { invoiceId, status } = req.body;

  if (!invoiceId || !status) {
    console.log("Missing invoiceId or status in callback.");
    return res.status(400).json({ error: "Missing invoiceId or status" });
  }

  try {
    const unifieduser = await unifiedusersCollection.findOne({
      "conferences.paymentData.invoiceId": invoiceId,
    });

    if (!unifieduser) {
      console.log("Invoice not found for invoiceId:", invoiceId);
      return res.status(404).json({ error: "Invoice not found" });
    }

    const statusMap = {
      success: "paid",
      pending: "pending",
      failure: "failed",
    };
    const monoStatus = status.toLowerCase();

    const conferenceToUpdate = unifieduser.conferences.find(
      (conf) => conf.paymentData?.invoiceId === invoiceId
    );

    if (conferenceToUpdate) {
      conferenceToUpdate.paymentData.status = statusMap[monoStatus] || "failed";

      if (status === "success" && conferenceToUpdate.promoCode) {
        try {
          const file = await readFile(promoPath, "utf-8");
          let promoCodes = JSON.parse(file);
          const promoIndex = promoCodes.findIndex(
            (p) => p.code === conferenceToUpdate.promoCode && !p.used
          );

          if (promoIndex !== -1) {
            promoCodes[promoIndex].used = true;
            await writeFile(promoPath, JSON.stringify(promoCodes, null, 2));
            console.log(
              `✅ Промокод ${promoCodes[promoIndex].code} помечен как использованный`
            );
          } else {
            console.warn(
              `⚠️ Промокод ${conferenceToUpdate.promoCode} не найден или уже использован при успешной оплате для invoiceId: ${invoiceId}`
            );
          }
        } catch (err) {
          console.error("⚠️ Не удалось обновить статус промокода:", err);
        }
      }

      await updateunifieduserById(unifieduser._id, {
        conferences: unifieduser.conferences,
      });
      console.log(
        `Unified user ${unifieduser._id} saved successfully AFTER payment callback.`
      );
    } else {
      console.warn(
        `⚠️ Конференция с invoiceId ${invoiceId} не найдена в unifieduser ${unifieduser._id}`
      );
    }

    res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    console.error("Error in payment-callback:", error);
    next(error);
  }
});

// ---------- Статика и SPA ----------
const staticFilesPath = join(__dirname, "../");

app.use(
  express.static(staticFilesPath, {
    setHeaders: (res, path) => {
      if (/\.(webp|jpg|png|gif)$/.test(path)) {
        res.setHeader("Cache-Control", "public, max-age=36000");
      }
    },
  })
);

app.get("/*", (req, res) => {
  res.sendFile(join(staticFilesPath, "index.html"));
});

app.use(errorHandler);

app.listen(PORT, HOST, async () => {
  console.log(`Сервер запущен по адресу: http://${HOST}:${PORT}`);

  // Устанавливаем вебхук для Telegram
  try {
    const webhookURL = `${WEBHOOK_URL}/bot${BOT_TOKEN}`;
    await bot.setWebHook(webhookURL);
    console.log(`✅ Webhook встановлено на адресу: ${webhookURL}`);
  } catch (error) {
    console.error("❌ Помилка при встановленні Webhook:", error.message);
  }
});
