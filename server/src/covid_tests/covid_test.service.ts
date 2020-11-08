import QueryService from "../QueryService";
import {
  CreateCovidTest,
  GetAllCovidTests,
  UpdateCovidTestByPK,
} from "./covid_test.queries";
import PersonService from "../persons/person.service";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import {
  insertValues,
  setValues,
  getPropertiesAndValues,
} from "../helpers/helpers";
import { COVID_TEST_TABLE } from "../helpers/tables";
import moment from "moment";

const { tableName, columns } = COVID_TEST_TABLE;

export default class CovidTest {
  private queryService: QueryService;
  private personService: PersonService;

  constructor() {
    this.queryService = new QueryService();
    this.personService = new PersonService();
  }

  createCovidTest = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(columns));
    attributes[columns.test_input_time.getName()] = moment().utc();
    const { properties, values } = insertValues(attributes, types);
    const result = await this.queryService.query(
      CreateCovidTest(properties, values)
    );
    const status = getPropertiesAndValues(
      attributes,
      new ExpectedValueTypes([columns.status], true)
    ).values;
    if (status.length === 1 && status[0] === true) {
      await this.testSetToTrueTriggers(result[0][columns.person_id.getName()]);
    }
    return result;
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
    const result = await this.queryService.query(
      UpdateCovidTestByPK(personId, testCentreId, inputTime, values)
    );
    const status = getPropertiesAndValues(
      attributes,
      new ExpectedValueTypes([columns.status], true)
    ).values;
    if (status.length === 1 && status[0] === true) {
      await this.testSetToTrueTriggers(result[0][columns.person_id.getName()]);
    }
    return result;
  };

  private testSetToTrueTriggers = async (personId: number) => {
    this.personService.updatePersonStatusToPositive(personId);
  };
}
