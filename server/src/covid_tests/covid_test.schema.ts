import Joi from "joi";

export const createCovidTestSchema = Joi.object({
  person_id: Joi.number().positive().required(),
  covid_testing_centre_id: Joi.number().positive().required(),
  test_time: Joi.date().required(),
  status: Joi.boolean(),
});

export const updateCovidTestSchema = Joi.object({
  status: Joi.boolean().required(),
});
