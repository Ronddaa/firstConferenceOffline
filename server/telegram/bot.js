import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { TelegramUser } from "../db/models/telegramUsers.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const adminId = 718830020; // My Telegram ID

const channelLink = "https://t.me/kodzhinky";
const supportLink = "https://t.me/women_psyconference";
const instagramLink = "https://www.instagram.com/kod.zhinky?igsh=MXQ5djN3cXBhenQ0bQ==";
const siteLink = "https://warsawkod.women.place/?utm_source=Telegram_bot&utm_medium=referral&utm_campaign=telegram_bot";

// 🔹 Функция для отправки заявки админу в личку
export async function sendFormToAdmin({ fullName, phone, telegram, utmParams = {} }) {
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
    console.error("❌ Не вдалося надіслати повідомлення адміну:", error.message);
  }
}

// 🔹 Обработка команды /start
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
    const updatedUser = await TelegramUser.findOneAndUpdate(
      { telegramID: userData.telegramID },
      {
        $setOnInsert: userData,
        $push: { transitions: { date: new Date(), source } }
      },
      { upsert: true, new: true }
    );

    await bot.sendMessage(chatID,
      `Вітаємо, <b>${userData.firstName}</b>!✨

Ми раді, що ти тут💛
Це вже більше, ніж просто крок — це шлях до себе.

Щоб ти нічого не пропустила(в):
Вся інформація, бекстейдж, розклад і новини — у нашому Telegram-каналі.

Якщо щось не працює чи маєш питання — натисни на кнопку «Підтримка».

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
              { text: "Instagram", url: instagramLink },
              { text: "Наш сайт", url: siteLink }
            ]
          ]
        }
      });

  } catch (err) {
    console.error("Error in /start handler:", err);
  }
});

export default bot;