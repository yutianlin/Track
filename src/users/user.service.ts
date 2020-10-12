import QueryService from "../QueryService";
import { GetAllUsers, GetUserById } from "./user.queries";

export default class UserService {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getUsers = async () => {
    return this.queryService.query(GetAllUsers);
  };

  getUserById = async (id: number) => {
    return this.queryService.query(GetUserById(id));
  };
}
