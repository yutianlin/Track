import Joi from "joi";

export const createBubbleSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateBubbleSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});
