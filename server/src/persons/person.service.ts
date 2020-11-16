import QueryService from "../QueryService";
import {
  GetAllPersons,
  GetPersonById,
  CreatePerson,
  UpdatePersonById, GetPersonStatusById,
} from "./person.queries";
import { insertValues, setValues } from "../helpers/helpers";
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

  getPersonStatusById = async (id: number) => {
    return this.queryService.query(GetPersonStatusById(id));
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
    return this.getPersonById(id);
  };

  updatePersonStatusToPositive = async (id: number) => {
    await this.queryService.query(
      UpdatePersonById(`${columns.person_status.getName()} = true`, id)
    );
  };
}
