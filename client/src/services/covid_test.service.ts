import {RemoteService} from "./remote.service";
import {CovidTestingCentre} from "../model/covid_testing_centre";
import {CovidTestInfo} from "../model/covid_test";
import {CovidTestConversions} from "../conversions/covid_test.conversions";

class CovidTestService extends RemoteService {
  public async getAllCovidTestingCentres(): Promise<CovidTestingCentre[]> {
    const covidTestingCentresResponse = await this.get("/covid_testing_centres");
    return covidTestingCentresResponse.data;
  }

  public async getAllCovidTestsForUser(personId: number): Promise<CovidTestInfo[]> {
    const response = await this.get(`/covid_test_info/${personId}`);
    return CovidTestConversions.toCovidTestInfos(response.data);
  }
}

export const covidTestService = new CovidTestService();