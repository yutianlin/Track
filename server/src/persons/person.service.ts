import QueryService from "../QueryService";
import {
  GetAllPersons,
  GetPersonById,
  CreatePerson,
  UpdatePersonById,
} from "./person.queries";
import { insertValues, updateValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";

const NOTNULLABLESTRINGPROPERTIES = ["name"];
const NULLABLESTRINGPROPERTIES = ["email", "phone_number"];
const NULLABLENUMBERPROPERTIES = ["student_id", "faculty_id"];
const NULLABLEBOOLEANPROPERTIES = ["in_app_notification"];

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
    const types = new ExpectedValueTypes();
    types.setNotNullableStrings(NOTNULLABLESTRINGPROPERTIES);
    types.setNullableStrings(NULLABLESTRINGPROPERTIES);
    types.setNullableBooleans(NULLABLEBOOLEANPROPERTIES);
    types.setNullableNumbers(NULLABLENUMBERPROPERTIES);
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreatePerson(properties, values));
  };

  updatePersonById = async (id: number, attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNullableStrings([
      ...NULLABLESTRINGPROPERTIES,
      ...NOTNULLABLESTRINGPROPERTIES,
    ]);
    types.setNullableBooleans(NULLABLEBOOLEANPROPERTIES);
    types.setNullableNumbers(NULLABLENUMBERPROPERTIES);
    const set = updateValues(attributes, types);
    await this.queryService.query(UpdatePersonById(set, id));
    return this.getPersonById(id);
  };
}
