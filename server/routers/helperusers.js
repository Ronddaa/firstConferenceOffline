import express from "express";
import { sendFormToAdmin } from "../telegram/bot.js";

const router = express.Router();

router.post("/helperusers", async (req, res) => {
  try {
    const { fullName, phone, telegram, utmParams = {} } = req.body;

    // 🔹 Отправка в Telegram
    await sendFormToAdmin({
      fullName,
      phone,
      telegram,
      utmParams, // <-- теперь передаём UTM-метки
    });

    // 🔹 Можно сохранить в базу, если нужно (опционально)
    // await HelperUser.create({ fullName, phone, telegram, utmParams });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error in /helperusers:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;