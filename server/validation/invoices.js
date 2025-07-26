import Joi from "joi";

const validTariffs = ["Basik+", "Balance", "Luxe", "Only ticket", "BRUNCH"];

export const createInvoiceSchema = Joi.object({
  user: Joi.object({
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    telegramNick: Joi.string().required(),
  }).required(),

  purchase: Joi.object({
    tariffs: Joi.array()
      .items(Joi.string().valid(...validTariffs))
      .min(1)
      .required(),
    ticketsQuantity: Joi.number().required(),
    totalAmount: Joi.number().required(),
  }).required(),
  utmMarks: Joi.object({
    utm_source: Joi.string(),
    utm_medium: Joi.string(),
    utm_campaign: Joi.string(),
  }),
});
