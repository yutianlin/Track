import Joi from "joi";

export const createCovidTestSchema = Joi.object({
  person_id: Joi.string().min(1).required(),
  covid_testing_centre_id: Joi.string().min(1).required(),
  test_time: Joi.date(),
});
