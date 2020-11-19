const Joi = require("joi");

export const createPersonSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email(),
  phone_number: Joi.string().regex(/^\d+$/),
  in_app_notification: Joi.boolean(),
  student_id: Joi.number().positive(),
  faculty_id: Joi.number().positive(),
  person_status: Joi.string().min(1).max(1),
});

export const updatePersonSchema = Joi.object({
  name: Joi.string().min(1),
  email: Joi.string().email().allow(null),
  phone_number: Joi.string().regex(/^\d+$/).allow(null),
  in_app_notification: Joi.boolean(),
  student_id: Joi.string().regex(/^\d+$/).allow(null),
  faculty_id: Joi.string().regex(/^\d+$/).allow(null),
  person_status: Joi.string(),
});
