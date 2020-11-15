import {CovidTestingCentre} from "./covid_testing_centre";

export interface CovidTest {
  test_time: string,
  status: boolean,
  test_input_time: string,
  person_id?: number
}

export interface CovidTestInfo {
  covid_test: CovidTest,
  covid_testing_centre: CovidTestingCentre
}