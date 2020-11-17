import Joi from "joi";

export const createBubbleSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});