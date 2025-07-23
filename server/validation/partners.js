import Joi from "joi";

export const createPartnerSchema = Joi.object({
  companyName: Joi.string().required(),
  contactPerson: Joi.string().required(),
  contactInfo: Joi.string().required(),
  telegramNick: Joi.string().required(),
  instagramLink: Joi.string().uri().required(),
  utmMarks: Joi.object({
    utm_source: Joi.string().allow(""),
    utm_medium: Joi.string().allow(""),
    utm_campaign: Joi.string().allow(""),
  }).optional(),
});