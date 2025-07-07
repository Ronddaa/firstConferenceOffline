import { UtmMarks } from "../db/models/utmMarks.js"; // убедись, что путь и расширение .js правильные

export async function utmTracker(req, res, next) {
  try {
    const { utm_source, utm_medium, utm_campaign } = req.query;

    if (!utm_source || !utm_medium || !utm_campaign) {
      return next();
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.connection.remoteAddress;

    const userAgent = req.headers["user-agent"];

    try {
      await UtmMarks.create({
        utm_source,
        utm_medium,
        utm_campaign,
        ip,
        userAgent,
      });
    } catch (error) {
      if (error.code !== 11000) {
        console.error("Ошибка при записи в БД:", error);
      }
    }

    return next();
  } catch (err) {
    console.error("Ошибка в middleware utmTraker:", err);
    return next();
  }
}