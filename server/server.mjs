import express from "express";
import cors from "cors";
// import bodyParser from "body-parser"; // не нужен
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

import env from "./utils/env.js";

import pinoHttp from "pino-http";
import cookieParser from "cookie-parser";
import initMongoConnection from "./db/initMongoConnection.js";

import { InvoicesCollection } from "./db/models/invoices.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { createInvoice, updateInvoiceById } from "./services/invoices.js";
import { sendTicket } from "./utils/sendTicket.js";
import bot from "./telegram/bot.js";

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
  credentials: true, // Позволяет отправку cookies
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Используем express.json() вместо bodyParser.json()
app.use(express.json());
app.use(cookieParser());


import { utmTracker } from "./middlewares/utmMarks.js";
app.use(utmTracker);

// Подключаем основной маршрутизатор (API роуты)
app.use(router);

 app.use(pinoHttp()); // раскомментируй, если нужно логирование запросов

const monoBankToken = env("MONOBANK_TOKEN");
// const facebookAccessToken = env("FACEBOOK_ACCESS_TOKEN");
// const facebookPixelId = env("FACEBOOK_PIXEL_ID");
const usersDBFilePath = join(__dirname, "usersDB.json");

app.post("/create-payment", async (req, res) => {
  const { user, purchase, redirectUrL } = req.body;
  if (!user || !purchase) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const response = await axios.post(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        amount: purchase.totalAmount * 100,
        ccy: 978,
        redirectUrL,
        webHookUrl: "https://warsawkod.women.place/payment-callback",
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

    await createInvoice({
      user,
      purchase,
      paymentData,
    });

    res.status(200).json({
      invoiceId: response.data.invoiceId,
      pageUrl: response.data.pageUrl,
    });
  } catch (error) {
    console.error(
      "Error creating payment:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Failed to create payment", message: error.message });
  }
});

// Обработка вебхука
app.post("/payment-callback", async (req, res) => {
  const { invoiceId, status } = req.body;
  console.log(invoiceId, status);
  if (!invoiceId || !status) {
    return res.status(400).json({ error: "Missing invoiceId or status" });
  }

  try {
    const invoice = await InvoicesCollection.findOne({
      "paymentData.invoiceId": invoiceId,
    });

    if (!invoice) {
      console.log("invoice not found");
      return res.status(404).json({ error: "Invoice not found" });
    }

    const statusMap = {
      success: "paid",
      pending: "pending",
    };

    invoice.paymentData.status = statusMap[status] || "failed";

    await updateInvoiceById(invoice._id, invoice);

    // после получения статуса success отправить юзеру письмо с билетом
    if (invoice.paymentData.status === "paid") {
      const ticketName = invoice.purchase.tariffs[0].toLowerCase() + "Ticket";
      try {
        await sendTicket(invoice, ticketName);
      } catch (error) {
        console.log(
          `An error occured while trying to send ticket to invoice owner ${invoice.user.email} `
        );
      }
    }
    return res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    console.log("Error while payment-callback working: ", error);
    res
      .status(500)
      .json({ error: "Error caused while payment-callback working" });
  }
});

// Статические файлы
const staticFilesPath = join(__dirname, "../");

app.use(
  express.static(staticFilesPath, {
    setHeaders: (res, path) => {
      if (
        path.endsWith(".webp") ||
        path.endsWith(".jpg") ||
        path.endsWith(".png") ||
        path.endsWith(".gif")
      ) {
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

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
