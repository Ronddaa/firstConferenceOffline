import { unifiedusersCollection } from "../db/models/unifiedusers.js"; // Убедитесь, что путь верный
import {
  // createunifieduser, // Эту функцию мы больше не используем напрямую
  upsertunifieduser, // Теперь импортируем новую функцию
  getAllunifiedusers,
  getunifieduserById,
} from "../services/unifiedusers.js"; // Убедитесь, что путь верный
import { sendTicket } from "../utils/sendTicket.js"; // Убедитесь, что путь верный

// Мы переименовали createunifieduser в upsertunifieduser в сервисе.
// Теперь этот контроллер должен вызывать upsertunifieduser.
export const createunifieduserController = async (req, res, next) => {
  // Добавлен next для передачи ошибок
  const payload = req.body;

  try {
    // Вся логика "проверки, существует ли запись" теперь внутри upsertunifieduser сервиса.
    // Просто вызываем ее, и она либо найдет, либо создаст пользователя.
    const unifieduser = await upsertunifieduser(payload);

    // В зависимости от того, что вернул upsertunifieduser (создание или обновление),
    // можно вернуть соответствующий статус. Сейчас всегда 201, что нормально для upsert.
    res.status(201).json({
      status: 201,
      message: "Successfully processed unifieduser (created or updated)!",
      data: unifieduser,
    });
  } catch (error) {
    // Используем next для передачи ошибки в централизованный errorHandler
    next(error);
  }
};

export const getAllunifiedusersController = async (req, res, next) => {
  // Добавлен next
  try {
    const unifieduser = await getAllunifiedusers();
    res.status(200).json({
      status: 200,
      message: "Unifiedusers were successfully found!",
      data: unifieduser,
    });
  } catch (error) {
    next(error);
  }
};

export const getunifieduserByIdController = async (req, res, next) => {
  // Добавлен next
  try {
    const unifieduser = await getunifieduserById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Unifieduser was successfully found!",
      data: unifieduser,
    });
  } catch (error) {
    next(error);
  }
};

export const sendTicketToUserController = async (req, res, next) => {
  // Добавлен next
  try {
    const unifieduser = await unifiedusersCollection.findById(req.params.id);

    if (!unifieduser) {
      // Если пользователь не найден, возвращаем 404
      return res.status(404).json({
        status: 404,
        message: "Unifieduser not found!",
      });
    }

    // ВНИМАНИЕ: Здесь у вас используется `unifieduser.purchase.tariffs[0]`.
    // Мы изменили структуру на `conferences`.
    // Если вам нужен тариф из ПОСЛЕДНЕЙ конференции, это будет `unifieduser.conferences[unifieduser.conferences.length - 1].ticketType`.
    // Если вам нужен тариф из какой-то конкретной конференции (например, той, для которой отправляется билет),
    // вам нужно будет передать в этот эндпоинт не только ID пользователя, но и ID конкретной конференции
    // или invoiceId, чтобы найти ее.
    // Для простоты, если предполагается, что билет отправляется для последней добавленной конференции:
    const lastConference =
      unifieduser.conferences[unifieduser.conferences.length - 1];
    if (!lastConference || !lastConference.ticketType) {
      return res.status(400).json({
        status: 400,
        message:
          "No conference or ticketType found for this user to send a ticket.",
      });
    }

    const ticketName = lastConference.ticketType.toLowerCase() + "Ticket"; // Исправлено на новую структуру
    const response = await sendTicket(unifieduser, ticketName); // sendTicket должен уметь работать с новой структурой unifieduser

    res.status(200).json({
      status: 200,
      message: "Ticket was successfully sent!",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
