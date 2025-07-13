import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { TelegramUser } from "../db/models/telegramUsers.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const channelLink = "https://t.me/kodzhinky";
const supportLink = "https://t.me/women_psyconference";
const instagramLink = "https://www.instagram.com/kod.zhinky?igsh=MXQ5djN3cXBhenQ0bQ==";
const siteLink = "https://warsawkod.women.place/?utm_source=Telegram_bot&utm_medium=referral&utm_campaign=telegram_bot";

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
      `Вітаємо, <b>${userData.firstName}</b>!✨\n\n
Ми раді, що ти тут💛
Це вже більше, ніж просто крок — це шлях до себе.\n\n
Щоб ти нічого не пропустила(в):
Вся інформація, бекстейдж, розклад і новини — у нашому Telegram-каналі.\n\n
Якщо щось не працює чи маєш питання — натисни на кнопку «Підтримка».\n\n
Обіймаємо тебе ще до зустрічі 💛
<b>Команда «Код Жінки»</b>`, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "📢 Канал", url: channelLink },
              { text: "💬 Підтримка", url: supportLink }
            ],
            [
              {text: "Instagram", url: instagramLink},
              {text: "Наш сайт", url: siteLink}
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