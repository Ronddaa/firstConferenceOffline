import Joi from "joi";

export const createPartnerSchema = Joi.object({
  companyName: Joi.string().required(),
  contactPerson: Joi.string().required(),
  contactInfo: Joi.string().required(),
  telegramNick: Joi.string().required(),
  instagramLink: Joi.string().required(),
});
