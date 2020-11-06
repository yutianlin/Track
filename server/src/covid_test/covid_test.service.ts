import QueryService from "../QueryService";
import { CreateCovidTest, GetAllCovidTests } from "./covid_test.queries";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { insertValues } from "../helpers/helpers";
import { COVID_TEST_TABLE as CT } from "../helpers/tables"

export default class CovidTest {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  createCovidTest = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(CT.columns));
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateCovidTest(properties, values));
  };

  getAllCovidTests = async () => {
    return this.queryService.query(GetAllCovidTests);
  };
}
