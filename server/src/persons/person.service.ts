import QueryService from "../QueryService";
import {
  GetAllPersons,
  GetPersonById,
  CreatePerson,
  UpdatePersonById,
  UpdatePersonsByIdStatusToYellow,
} from "./person.queries";
import {
  insertValues,
  setValues,
  getPropertiesAndValues,
} from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { PERSON_TABLE } from "../helpers/tables";

const { tableName, columns } = PERSON_TABLE;
const expectValues = [
  columns.email,
  columns.faculty_id,
  columns.in_app_notification,
  columns.name,
  columns.phone_number,
  columns.student_id,
  columns.person_status,
];

export default class PersonService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllPersons = async () => {
    return this.queryService.query(GetAllPersons);
  };

  getPersonById = async (id: number) => {
    return this.queryService.query(GetPersonById(id));
  };

  createPerson = async (attributes: any) => {
    const types = new ExpectedValueTypes(expectValues);
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreatePerson(properties, values));
  };

  updatePersonById = async (id: number, attributes: any) => {
    const types = new ExpectedValueTypes(expectValues, true);
    const set = setValues(attributes, types);
    await this.queryService.query(UpdatePersonById(set, id));
    const status = getPropertiesAndValues(
      attributes,
      new ExpectedValueTypes([columns.person_status])
    ).values;
    if (status.length === 1 && status[0] === `'R'`) {
      await this.triggerWhenStatusSetToRed(id);
    }
    return this.getPersonById(id);
  };

  updatePersonStatusToPositive = async (id: number) => {
    await this.queryService.query(
      UpdatePersonById(`${columns.person_status.getName()} = "R"`, id)
    );
  };

  triggerWhenStatusSetToRed = async (personId: number) => {
    console.log(await this.queryService.query(UpdatePersonsByIdStatusToYellow(personId, "'2021-12-02'", "'2021-12-09'")));
    // set related people to yellow status
  };
}
