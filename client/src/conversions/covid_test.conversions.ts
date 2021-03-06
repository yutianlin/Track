import {CovidTestInfo} from "../model/covid_test";
import {toIsoString} from "./conversions.util";
import {CovidTestFormState} from "../features/covid_tests/covid_test.form";
import {CovidStatus} from "../model/covid_status";

export class CovidTestConversions {
  public static toCovidTestInfos(covidTests: any[]): CovidTestInfo[] {
    return covidTests.map(covidTest => {
      return {
        covid_test: {
          test_time: toIsoString(covidTest.test_time),
          test_input_time: toIsoString(covidTest.test_input_time),
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