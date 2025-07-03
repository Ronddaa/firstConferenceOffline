import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { TelegramUser } from "../db/models/telegramUsers.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const channelLink = "https://t.me/kodzhinky"

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
  const chatID = msg.chat.id;
  const source = match?.[1] || "unknown";

  const userData = {
    telegramID: msg.from.id.toString(),
    username: msg.from.username,
    firstName: msg.from.first_name,
    lastName: msg.from.last_name,
    languageCode: msg.from.language_code,
    isPremium: msg.from.is_premium || false,
    source,
  };

  try {
    await TelegramUser.findOneAndUpdate(
      { telegramID: userData.telegramID },
      userData,
      { upsert: true, new: true }
    );

    await bot.sendMessage(chatID, 
        `Вітаємо, <b>${userData.firstName}</b>! Ви успішно приєдналися.\n\n` +
        `Для отримання всієї інформації переходьте у наш ` +
        `<a href="${channelLink}">Telegram-канал</a>.`, 
        { parse_mode: "HTML", disable_web_page_preview: true }
      );
  } catch (err) {
    console.error("Error saving Telegram user: ", err);
  }
});

export default bot;