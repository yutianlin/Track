import Joi from "joi";
import {CovidStatus} from "../../model/covid_status";

export const createCovidTestSchema = Joi.object({
  covid_testing_centre: Joi.object().unknown(true).required(),
  test_time: Joi.date().required(),
  status: Joi.string().required(),
});

export const updateCovidTestSchema = Joi.object({
  covid_testing_centre: Joi.object().unknown(true).required(),
  test_time: Joi.date().required(),
  status: Joi.string().valid(CovidStatus.POSITIVE, CovidStatus.NEGATIVE).required(),
});