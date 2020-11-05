import QueryService from "../QueryService";
import {
  GetAllPersons,
  GetPersonById,
  CreatePerson,
  UpdatePersonById,
} from "./person.queries";
import { insertValues, updateValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { PERSON_TABLE } from "../helpers/tables";

const { tableName, columns } = PERSON_TABLE;
const expectValues = [columns.email, columns.facultyId, columns.inAppNot, columns.name, columns.phoneNum, columns.studentId];

export default class PersonService {
  queryService: QueryService;

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
    const set = updateValues(attributes, types);
    await this.queryService.query(UpdatePersonById(set, id));
    return this.getPersonById(id);
  };
}
