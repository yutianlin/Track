const Joi = require("joi");

export const createFacultySchema = Joi.object({
  faculty_id: Joi.string().regex(/^\d+$/),
  job_title: Joi.string().min(1).required(),
});

export const updateFacultySchema = Joi.object({
  job_title: Joi.string().min(1),
});
