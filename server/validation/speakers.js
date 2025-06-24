import Joi from "joi";

export const createSpeakerSchema = Joi.object({
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  telegram: Joi.string().required(),
  instagram: Joi.string().required(),
});
