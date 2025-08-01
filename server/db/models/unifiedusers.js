import { Schema, model } from "mongoose";

const unifiedUserSchema = new Schema(
  {
    // --- Добавлены/скорректированы корневые поля ---
    fullName: {
      firstName: { type: String, default: "" }, // Имя пользователя
      lastName: { type: String, default: "" }, // Фамилия пользователя
    },
    phoneNumber: { type: String, default: "" }, // Телефон пользователя
    email: { type: String, default: "" }, // Почта пользователя
    // --- Конец добавленных/скорректированных корневых полей ---
    telegram: {
      id: { type: String, default: "" }, // Уникальный телеграм Id
      userName: { type: String, default: "" }, // Ник пользователя в телеграме
      firstName: { type: String, default: "" }, // Имя пользователя
      languageCode: { type: String, default: "" },
      phone: { type: String, default: "" }, // Телефон пользователя, если доступен
      isPremium: { type: Boolean, default: false },
      source: { type: [String], default: [] }, // Исходный путь, с какой платформы человек попал в телеграм Бота (массив строк)
      transitions: [
        {
          date: { type: Date, default: Date.now }, // Дата перехода
          source: { type: String, default: "" },
        },
      ],
    },
    conferences: [
      {
        conference: { type: String, required: true }, // Название конференции или встречи
        type: { type: String, enum: ["online", "offline"], required: true }, // Онлайн или офлайн встреча
        ticketType: { type: String, required: true }, // Тип билета или тарифа
        ticketsQuantity: { type: Number, required: true }, // Количество билетов или мест на мероприятие
        totalAmount: { type: Number, required: true }, // Общая сумма потраченная на покупку мест или билетов
        takeBrunch: { type: Boolean, default: false }, // Была ли выбрана опция "Бранч"
        paymentData: {
          invoiceId: String, // ID инвойса для оплаты
          status: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
          }, // Статус оплаты
        },
        promoCode: { type: String, default: "" }, // Промокод, если использовался
        utmMarks: [
          {
            source: { type: String, default: "" },
            medium: { type: String, default: "" },
            campaign: { type: String, default: "" },
          },
        ], // Массив UTM меток
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

export const unifiedusersCollection = model("UnifiedUser", unifiedUserSchema);
