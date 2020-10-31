const Joi = require("joi");

export const createPersonSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email(),
  phone_number: Joi.string().regex(/^\d+$/),
  in_app_notification: Joi.boolean(),
  student_id: Joi.string().regex(/^\d+$/),
  faculty_id: Joi.string().regex(/^\d+$/),
});

export const updatePersonSchema = Joi.object({
  name: Joi.string().min(1),
  email: Joi.string().email(),
  phone_number: Joi.string().regex(/^\d+$/),
  in_app_notification: Joi.boolean(),
  student_id: Joi.string().regex(/^\d+$/),
  faculty_id: Joi.string().regex(/^\d+$/),
});
