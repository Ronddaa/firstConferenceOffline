import Joi from "joi";

export const createSpeakerSchema = Joi.object({
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  telegram: Joi.string().required(),
  instagram: Joi.string().uri().required(),
  utmMarks: Joi.object({
    utm_source: Joi.string().allow(""),
    utm_medium: Joi.string().allow(""),
    utm_campaign: Joi.string().allow(""),
  }).optional(),
});