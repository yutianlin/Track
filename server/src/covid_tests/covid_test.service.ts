import QueryService from "../QueryService";
import {
  CreateCovidTest,
  GetAllCovidTests,
  UpdateCovidTestByPK,
} from "./covid_test.queries";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { insertValues, setValues } from "../helpers/helpers";
import { COVID_TEST_TABLE } from "../helpers/tables";
import moment from "moment";

const { tableName, columns } = COVID_TEST_TABLE;

export default class CovidTest {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  createCovidTest = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(columns));
    attributes[columns.test_input_time.getName()] = moment().utc();
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateCovidTest(properties, values));
  };

  getAllCovidTests = async () => {
    return this.queryService.query(GetAllCovidTests);
  };

  updateCovidTestByPK = async (
    personId: number,
    inputTime: string,
    testCentreId: number,
    attributes: any
  ) => {
    const types = new ExpectedValueTypes([columns.status]);
    const values = setValues(attributes, types);
    return this.queryService.query(
      UpdateCovidTestByPK(personId, testCentreId, inputTime, values)
    );
  };
}
