const Joi = require("joi");

export const relationSchema = Joi.object({
  person_id: Joi.number().positive().required(),
  scheduled_class_id: Joi.string().min(1).required(),
});
