const Joi = require("joi");

export const createRelationSchema = Joi.object({
  person_id: Joi.number().positive().required(),
  entrance_id: Joi.number().positive().required(),
});
