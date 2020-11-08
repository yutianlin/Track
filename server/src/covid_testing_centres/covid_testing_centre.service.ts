import QueryService from "../QueryService";
import {
  GetAllCovidTestingCentres,
  GetCovidTestingCentreById,
} from "./covid_testing_centre.queries";

export default class CovidTestingCentre {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllCovidTestingCentres = async () => {
    return this.queryService.query(GetAllCovidTestingCentres);
  };

  getCovidTestingCentreById = async (id: number) => {
    return this.queryService.query(GetCovidTestingCentreById(id));
  };
}
