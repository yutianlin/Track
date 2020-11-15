import Joi from "joi";
import {CovidStatus} from "../../model/covid_status";

export const createCovidTestSchema = Joi.object({
  covid_testing_centre_id: Joi.number().positive().required(),
  test_time: Joi.date().required(),
  status: Joi.string().required().allow(CovidStatus.POSITIVE, CovidStatus.NEGATIVE, CovidStatus.UNKNOWN),
});
