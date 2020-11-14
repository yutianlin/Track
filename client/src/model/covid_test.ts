import {Moment} from "moment";
import {CovidTestingCentre} from "./covid_testing_centre";

export interface CovidTest {
  test_time: Moment,
  status: boolean,
  test_input_time?: Moment,
  person_id?: number
}

export interface CovidTestInfo {
  covid_test_info: CovidTest,
  covid_testing_centre: CovidTestingCentre
}