import QueryService from "../QueryService";
import { GetAllEntrances, GetEntranceById } from "./entrance.queries";

export default class Building {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllEntrances = async () => {
    return this.queryService.query(GetAllEntrances);
  };

  getEntranceById = async (id: number) => {
    return this.queryService.query(GetEntranceById(id));
  };
}
