import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { TelegramUser } from "../db/models/telegramUsers.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const channelLink = "https://t.me/kodzhinky";
const supportLink = "https://t.me/women_psyconference";

// Логируем все входящие сообщения для отладки
bot.on("message", (msg) => {
  console.log(`Received message from ${msg.from.id} (${msg.from.username}): ${msg.text}`);
});

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
  console.log(`Received /start from ${msg.from.id} (${msg.from.username}), params:`, match?.[1]);

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

  console.log("User data to save:", userData);

  try {
    const updatedUser = await TelegramUser.findOneAndUpdate(
      { telegramID: userData.telegramID },
      {
        $setOnInsert: userData,
        $push: { transitions: { date: new Date(), source } }
      },
      { upsert: true, new: true }
    );
    console.log("User saved or updated:", updatedUser);

    await bot.sendMessage(chatID,
      `Вітаємо, <b>${userData.firstName}</b>! Оберіть одну з опцій нижче:`, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "📢 Канал", url: channelLink },
              { text: "💬 Підтримка", url: supportLink }
            ]
          ]
        }
      });
    console.log(`Sent welcome message to user ${userData.telegramID}`);
  } catch (err) {
    console.error("Error in /start handler:", err);
  }
});

export default bot;