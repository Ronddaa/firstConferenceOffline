import { Schema, model } from "mongoose";

const utmMarksSchema = new Schema(
  {
    utm_source: String,
    utm_medium: String,
    utm_campaign: String,
    ip: String, // IP-адрес пользователя
    userAgent: String,
  },
  { timestamps: true }
);

// ❌ Удаляем уникальный индекс — теперь можно сохранять все заходы
// utmMarksSchema.index({ utm_source: 1, utm_medium: 1, utm_campaign: 1, ip: 1 }, { unique: true });

export const UtmMarks = model("utmMarks", utmMarksSchema);