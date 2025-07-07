import { Schema, model } from "mongoose";

const telegramUsersSchema = new Schema(
    {
        telegramID: { type: String, required: true, unique: true },
        username: String,
        firstName: String,
        lastName: String,
        languageCode: String,
        isPremium: Boolean,
        source: String,
        createdAt: {type: Date, default: Date.now}
    }
)

export const TelegramUser = model("TelegramUser", telegramUsersSchema)