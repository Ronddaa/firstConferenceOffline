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

// Токен MonoBank из env
const monoBankToken = env("MONOBANK_TOKEN");

// Маршрут создания оплаты
app.post("/api/create-payment", async (req, res) => {
  const { user, purchase, utmMarks } = req.body;

  if (!user || !purchase) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1. Создаем счет в монго, но без paymentData, она появиться
    //  в обработке вебхука
    const invoice = await createInvoice({
      user,
      purchase,
      utmMarks,
    });

    // 2. URL для редиректа после оплаты, с параметрами для фронта
    const redirectUrl = `https://warsawkod.women.place/thank-you/${invoice._id}`;

    // 3. Запрос создания счета в MonoBank
    const response = await axios.post(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        // amount: purchase.totalAmount * 100
        amount: 1, // копейки
        ccy: 980, // eur
        redirectUrl,
        webHookUrl: "https://warsawkod.women.place/payment-callback",
      },
      {
        headers: {
          "X-Token": monoBankToken,
          "Content-Type": "application/json",
        },
      }
    );

    // 4. Обновляем созданный invoice в Mongo с invoiceId от MonoBank
    const updatedInvoice = {
      ...invoice,
      paymentData: {
        invoiceId: response.data.invoiceId,
        status: "pending",
      },
    };
    await updateInvoiceById(invoice._id, updatedInvoice);

    // 5. Возвращаем данные клиенту
    res.status(200).json({
      invoiceId: response.data.invoiceId,
      pageUrl: response.data.pageUrl,
    });
  } catch (error) {
    console.error(
      "Error creating payment:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "Failed to create payment", message: error.message });
  }
});

// Обработка callback от MonoBank (обновление статуса оплаты)
app.post("/api/payment-callback", async (req, res) => {
  const { invoiceId, status } = req.body;
  // Add this at the start of your webhook handler
  console.log("Received payment callback:", {
    invoiceId,
    status,
    timestamp: new Date().toISOString(),
  });
  if (!invoiceId || !status) {
    return res.status(400).json({ error: "Missing invoiceId or status" });
  }

  try {
    // Находим счёт по invoiceId из callback
    const invoice = await InvoicesCollection.findOne({
      "paymentData.invoiceId": invoiceId,
    });

    if (!invoice) {
      console.log("Invoice not found for invoiceId:", invoiceId);
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Карта статусов из MonoBank в наши статусы
    const statusMap = {
      success: "paid",
      pending: "pending",
    };

    invoice.paymentData.status = statusMap[status] || "failed";

    // Сохраняем обновлённый статус оплаты
    await updateInvoiceById(invoice._id, invoice);
    return res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    console.error("Error in payment-callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Статические файлы (например, билеты, изображения)
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

// SPA - отдаём index.html на все остальные маршруты
app.get("/*", (req, res) => {
  res.sendFile(join(staticFilesPath, "index.html"));
});

app.use(errorHandler);

const PORT = 3000;
const HOST = "127.1.5.121";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
