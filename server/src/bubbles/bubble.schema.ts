import Joi from "joi";

export const createBubbleSchema = Joi.object({
  bubble_id: Joi.number().positive().required(),
  title: Joi.string(),
  description: Joi.string(),
});

export const updateBubbleSchema = Joi.object({
  bubble_id: Joi.number().positive(),
  title: Joi.string(),
  description: Joi.string(),
});
