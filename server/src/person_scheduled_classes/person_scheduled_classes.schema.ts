const Joi = require("joi");

export const relationSchema = Joi.object({
  person_id: Joi.number().positive().required(),
  department: Joi.string().min(1).required(),
  code: Joi.string().min(1).required(),
  section: Joi.string().min(1).required(),
  term: Joi.string().min(1).required(),
  year: Joi.number().positive().required(),
});
