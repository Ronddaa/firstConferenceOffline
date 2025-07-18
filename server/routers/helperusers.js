import { Router } from "express";
import { sendFormToAdmin } from "../telegram/bot.js";

const router = Router();

router.post("/", async (req, res) => {
  const { fullName, phone, telegram = "" } = req.body;

  if (!fullName || !phone) {
    return res.status(400).json({ error: "Missing fullName or phone" });
  }

  try {
    await sendFormToAdmin({ fullName, phone, telegram });
    return res.status(200).json({ message: "Form sent to admin via Telegram" });
  } catch (error) {
    console.error("❌ Failed to send Telegram message:", error);
    return res.status(500).json({ error: "Telegram sending failed" });
  }
});

export default router;