import QueryService from "../QueryService";
import { GetAllPersons, GetPersonById, CreatePerson, UpdatePerson } from "./person.queries";
import { updateValues, insertValues } from "../helpers";

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
    const {properties, values} = insertValues(attributes, NotNullableStringProperties, NullableStringProperties, [], NullableBooleanProperties, [], []);
    return this.queryService.query(CreatePerson(properties, values));
  };

  updatePerson = async (id: number, attributes: any) => {
    const {set} = updateValues(attributes, [], [...NotNullableStringProperties, ...NullableStringProperties], [], NullableBooleanProperties, [], [] );
    await this.queryService.query(UpdatePerson(set, id));
    return this.getPersonById(id);
  };
}
