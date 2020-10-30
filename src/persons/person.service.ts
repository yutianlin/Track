import QueryService from "../QueryService";
import { GetAllPersons, GetPersonById, CreatePerson, UpdatePerson } from "./person.queries";
import { insertValues, updateValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";

const NotNullableStringProperties = ["name"];
const NullableStringProperties = [
  "email",
  "phone_number",
  "student_id",
  "faculty_id",
];
const NullableBooleanProperties = ["in_app_notification"];

export default class UserService {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getPersons = async () => {
    return this.queryService.query(GetAllPersons);
  };

  getPersonById = async (id: number) => {
    return this.queryService.query(GetPersonById(id));
  };

  createPerson = async (attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNotNullableStrings(NotNullableStringProperties);
    types.setNullableStrings(NullableStringProperties);
    types.setNullableBooleans(NullableBooleanProperties);
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreatePerson(properties, values));
  };

  updatePerson = async (id: number, attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNullableStrings([...NullableStringProperties, ...NotNullableStringProperties]);
    types.setNullableBooleans(NullableBooleanProperties);
    const set = updateValues(attributes, types);
    await this.queryService.query(UpdatePerson(set, id));
    return this.getPersonById(id);
  };
}
