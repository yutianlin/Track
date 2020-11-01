const Joi = require("joi");

export const createRelationSchema = Joi.object({
  person_id: Joi.number().positive().required(),
  shared_bike_id: Joi.string().min(1).required(),
});
