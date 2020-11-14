import {CovidTestInfo} from "../model/covid_test";
import moment from 'moment-timezone';
import {userTimezone} from "./conversions.util";

export class CovidTestConversions {
  public static toCovidTestInfos(covidTests: any[]): CovidTestInfo[] {
    return covidTests.map(covidTest => {
      return {
        covid_test: {
          test_time: moment(covidTest.test_time).tz(userTimezone),
          test_input_time: covidTest.test_input_time,
          status: covidTest.status
        },
        covid_testing_centre: {
          covid_testing_centre_id: covidTest.covid_testing_centre_id,
          name: covidTest.centre_name,
          building_number: covidTest.building_number,
          street_number: covidTest.street_number,
          postal_code: covidTest.postal_code,
          city: covidTest.city,
          province: covidTest.province
        }
      }
    });
  }
}