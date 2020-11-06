import Joi from "joi";

const maxNumberLength = Number.MAX_SAFE_INTEGER.toString().length - 1;
const numberRegex = /^\d+$/;
export const createPersonSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ tlds: {allow: false} }).allow(null, ""),
  phone_number: Joi.string().regex(numberRegex).allow( ""),
  in_app_notification: Joi.boolean().required(),
  student_id: Joi.string().max(maxNumberLength).pattern(numberRegex).allow(""),
  faculty_id: Joi.string().max(maxNumberLength).pattern(numberRegex).allow( ""),
  job_title: Joi.string().min(1).when(
    "faculty_id",
    {is: Joi.string(), then: Joi.required(), otherwise: Joi.allow("")})
});