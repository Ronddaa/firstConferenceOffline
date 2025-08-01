import Joi from "joi";

export const createunifieduserSchema = Joi.object({
  fullName: Joi.object({
    firstName: Joi.string().required().allow(""), // Обязательно, но может быть пустой строкой
    lastName: Joi.string().required().allow(""), // Обязательно, но может быть пустой строкой
  }).required(),

  phoneNumber: Joi.string().required().allow(""), // Обязательно, но может быть пустой строкой

  email: Joi.string().email().required().allow(""), // Обязательно, но может быть пустой строкой

  telegram: Joi.object({
    id: Joi.string().allow("", null), // Может быть пустой строкой или null
    userName: Joi.string().allow("", null), // Может быть пустой строкой или null
    firstName: Joi.string().allow("", null), // Может быть пустой строкой или null
    languageCode: Joi.string().allow("", null), // Может быть пустой строкой или null
    phone: Joi.string().allow("", null), // Может быть пустой строкой или null
    isPremium: Joi.boolean().allow(null), // Может быть null
    source: Joi.array().items(Joi.string()).default([]), // Теперь массив строк, по умолчанию пустой массив
    transitions: Joi.array()
      .items(
        Joi.object({
          date: Joi.date().allow(null, ""), // Позволяем null или пустую строку для даты
          source: Joi.string().allow("", null), // Позволяем пустую строку или null
        })
      )
      .default([]), // По умолчанию пустой массив
  }).optional(), // Делаем весь объект telegram необязательным

  conferences: Joi.array()
    .items(
      Joi.object({
        conference: Joi.string().required(), // Название конференции - обязательно
        type: Joi.string().valid("online", "offline").required(), // Тип обязателен и должен быть 'online' или 'offline'
        ticketType: Joi.string().required(), // Обязательный
        ticketsQuantity: Joi.number().integer().min(1).required(), // Обязательный, целое число, минимум 1
        totalAmount: Joi.number().min(0).required(), // Обязательный, число, минимум 0 (т.к. приходит с фронтенда)
        takeBrunch: Joi.boolean().default(false), // По умолчанию false
        paymentData: Joi.object({
          invoiceId: Joi.string().allow("", null), // Может быть пустой строкой или null
          status: Joi.string()
            .valid("pending", "paid", "failed")
            .default("pending"), // По умолчанию 'pending'
        }).optional(), // Может отсутствовать при создании
        promoCode: Joi.string().allow("", null).default(""), // Может быть пустой строкой или null, по умолчанию пустая строка
        utmMarks: Joi.array() // Здесь ожидается массив из объекта/объектов
          .items(
            Joi.object({
              source: Joi.string().allow("", null).default(""),
              medium: Joi.string().allow("", null).default(""),
              campaign: Joi.string().allow("", null).default(""),
            })
          )
          .default([]), // По умолчанию пустой массив
      })
    )
    .min(1) // Добавлено: conferences должен содержать хотя бы 1 элемент
    .required(), // Добавлено: conferences - обязательный массив

  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
}).unknown(true); // Изменено на allowUnknown: false для строгой валидации
