import Joi from "joi";

export const createBubblePersonSchema = Joi.object({
  bubble_id: Joi.number().positive().required(),
  person_id: Joi.number().positive().required(),
});
