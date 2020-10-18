import QueryService from "../QueryService";
import { GetAllPersons, GetPersonById, CreatePerson } from "./person.queries";

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
    const name = `'${attributes.name}'`;
    const email = attributes.hasOwnProperty('email') ? `'${attributes.email}'` : null;
    const phone_number = attributes.hasOwnProperty('phone_number') ? attributes.phone_number : null;
    const in_app_notification = attributes.in_app_notification;
    return this.queryService.query(CreatePerson(name, in_app_notification, email, phone_number));
  }
}
