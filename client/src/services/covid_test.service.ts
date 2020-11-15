import {RemoteService} from "./remote.service";
import {CovidTestingCentre} from "../model/covid_testing_centre";
import {CovidTestInfo} from "../model/covid_test";
import {CovidTestConversions} from "../conversions/covid_test.conversions";
import {CovidTestFormState} from "../features/covid_tests/covid_test.form";

class CovidTestService extends RemoteService {
  public async getAllCovidTestingCentres(): Promise<CovidTestingCentre[]> {
    const covidTestingCentresResponse = await this.get("/covid_testing_centres");
    return covidTestingCentresResponse.data;
  }

  public async getAllCovidTestsForUser(personId: number): Promise<CovidTestInfo[]> {
    const response = await this.get(`/covid_test_info/${personId}`);
    return CovidTestConversions.toCovidTestInfos(response.data);
  }

  public async createCovidTest(personId: number, covidTestFormState: CovidTestFormState): Promise<void> {
    const requestPayload: any = CovidTestConversions.toCreateCovidTestPayload(personId, covidTestFormState);
    await this.post("/covid_tests", requestPayload);
  }

  public async updateCovidTest(personId: number, covidTestFormState: CovidTestFormState, testInputTime: string): Promise<void> {
    const requestPayload: any = CovidTestConversions.toUpdateCovidTestPayload(covidTestFormState);
    const centre_id: number = covidTestFormState.covid_testing_centre.covid_testing_centre_id;
    await this.patch(
      `/covid_tests/person_id/${personId}/test_centre_id/${centre_id}/input_time/${testInputTime}`,
      requestPayload);
  }
}

export const covidTestService = new CovidTestService();