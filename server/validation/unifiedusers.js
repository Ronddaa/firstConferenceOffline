import Joi from "joi";

export const createunifieduserSchema = Joi.object({
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),

  emails: Joi.array()
    .items(
      Joi.object({
        email: Joi.string().email().required(),
        verified: Joi.boolean().default(false),
        source: Joi.string().allow(""),
        date: Joi.string().allow(""), // или Joi.date().allow(null, "")
      }).unknown(true)
    )
    .optional(),

  phones: Joi.array()
    .items(
      Joi.object({
        phone: Joi.string().required(),
        verified: Joi.boolean().default(false),
        source: Joi.string().allow(""),
        date: Joi.string().allow(""),
      }).unknown(true)
    )
    .optional(),

  telegram: Joi.object({
    id: Joi.string().allow(""),
    userName: Joi.string().allow(""),
    firstName: Joi.string().allow(""),
    languageCode: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    isPremium: Joi.boolean().default(false),
    source: Joi.string().allow(""),
    transitions: Joi.array()
      .items(
        Joi.object({
          date: Joi.string().allow(""),
          source: Joi.string().allow(""),
        }).unknown(true)
      )
      .optional(),
  })
    .optional()
    .unknown(true),

  conferences: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("online", "offline").required(),
        conference: Joi.string().required(),
        utmMarks: Joi.array()
          .items(
            Joi.object({
              source: Joi.string().allow(""),
              medium: Joi.string().allow(""),
              campaing: Joi.string().allow(""),
            }).unknown(true)
          )
          .optional(),

        date: Joi.string().allow(""), // или Joi.date().allow(null, "")

        purchase: Joi.object({
          tarif: Joi.array().items(Joi.string()).optional(),
          ticketsQuantity: Joi.alternatives()
            .try(Joi.string().allow(""), Joi.number())
            .optional(),
          totalAmount: Joi.alternatives()
            .try(Joi.string().allow(""), Joi.number())
            .optional(),
          promoCode: Joi.string().allow(""),
          paymentData: Joi.object({
            invocieId: Joi.string().allow(""),
            status: Joi.string().allow(""),
          })
            .optional()
            .unknown(true),
        })
          .optional()
          .unknown(true),
      }).unknown(true)
    )
    .optional(),

  retrite: Joi.array()
    .items(
      Joi.object({
        firstName: Joi.string().allow(""),
        lastName: Joi.string().allow(""),
        phone: Joi.string().allow(""),
        email: Joi.string().allow(""),
        city: Joi.string().allow(""),
        purchase: Joi.object().optional().unknown(true),
      }).unknown(true)
    )
    .optional(),

  createdAt: Joi.date().allow("", null).optional(),
  updatedAt: Joi.date().allow("", null).optional(),
}).unknown(true); // Разрешает любые дополнительные поля сверху
