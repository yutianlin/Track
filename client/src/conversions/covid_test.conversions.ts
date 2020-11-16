import {CovidTestInfo} from "../model/covid_test";
import moment from 'moment-timezone';
import {userTimezone} from "./conversions.util";
import {CovidTestFormState} from "../features/covid_tests/covid_test.form";
import {CovidStatus} from "../model/covid_status";

export class CovidTestConversions {
  public static toCovidTestInfos(covidTests: any[]): CovidTestInfo[] {
    return covidTests.map(covidTest => {
      return {
        covid_test: {
          test_time: moment(covidTest.test_time).tz(userTimezone).toISOString(),
          test_input_time: moment(covidTest.test_input_time).tz(userTimezone).toISOString(),
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

  public static toCreateCovidTestPayload(personId: string | number, covidTestFormState: CovidTestFormState): any {
    const requestModel: any = {
      person_id: personId.toString(),
      test_time: covidTestFormState.test_time.toISOString(),
      covid_testing_centre_id: covidTestFormState.covid_testing_centre.covid_testing_centre_id
    };
    if (covidTestFormState.status !== CovidStatus.UNKNOWN) {
      requestModel["status"] = covidTestFormState.status === CovidStatus.POSITIVE;
    }

    return requestModel;
  }

  public static toUpdateCovidTestPayload(covidTestFormState: CovidTestFormState): any {
    return {
      status: covidTestFormState.status === CovidStatus.POSITIVE
    };
  }
}