import { Router } from "express";
import { unifiedusersCollection } from "../db/models/unifiedusers.js"; // Убедитесь, что этот путь правильный

const router = Router();

// Этот маршрут используется для получения данных пользователя по его ID
router.get("/:unifieduserId", async (req, res) => {
  try {
    const { unifieduserId } = req.params;
    // --- ЭТИ ЛОГИ КРАЙНЕ ВАЖНЫ ---
    console.log(
      `[БЭКЕНД] Получен запрос на unifieduser с ID: ${unifieduserId}`
    );

    const unifieduser = await unifiedusersCollection.findById(unifieduserId);

    if (!unifieduser) {
      // --- ЭТОТ ЛОГ ПОКАЖЕТ, ЧТО ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН ---
      console.log(`[БЭКЕНД] Пользователь не найден с ID: ${unifieduserId}`);
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // --- ЭТОТ ЛОГ ПОКАЖЕТ, ЧТО ПОЛЬЗОВАТЕЛЬ НАЙДЕН И ОТПРАВЛЯЕТСЯ ---
    console.log(
      `[БЭКЕНД] Пользователь найден и отправляется:`,
      unifieduser._id
    );
    res.status(200).json(unifieduser);
  } catch (error) {
    console.error(
      "[БЭКЕНД] Ошибка при получении данных пользователя по ID:",
      error
    );
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Здесь должны быть другие ваши маршруты, если они есть
// например, router.post("/unifiedusers/sendTicket/:id", ...);
// и роутер для промокодов, если он в этом же файле
// router.get("/promo/:code", ...);

export default router;
