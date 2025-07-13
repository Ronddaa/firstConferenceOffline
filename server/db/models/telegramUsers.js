import { Schema, model } from "mongoose";

const transitionSchema = new Schema({
  date: { type: Date, default: Date.now },
  source: { type: String, default: "unknown" }
});

const telegramUsersSchema = new Schema(
  {
    telegramID: { type: String, required: true, unique: true },
    username: String,
    firstName: String,
    lastName: String,
    languageCode: String,
    isPremium: Boolean,
    source: String,
    transitions: [transitionSchema], // Добавляем сюда
    createdAt: { type: Date, default: Date.now }
  }
);

export const TelegramUser = model("TelegramUser", telegramUsersSchema);