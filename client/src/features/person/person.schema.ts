import Joi from "joi";

const numberRegex = /^\d+$/;
export const createPersonSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ tlds: {allow: false} }).allow(""),
  phone_number: Joi.string().regex(numberRegex).allow( ""),
  in_app_notification: Joi.boolean().required(),
  student_id: Joi.number().positive().allow(""),
  faculty_id: Joi.number().positive().allow(""),
  job_title: Joi.string().min(1).when(
    "faculty_id",
    {is: Joi.string(), then: Joi.required(), otherwise: Joi.allow("")})
});
