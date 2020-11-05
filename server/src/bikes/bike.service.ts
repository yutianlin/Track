import QueryService from "../QueryService";
import { GetAllBikes, GetBikeById } from "./bike.queries";

export default class Building {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllBikes = async () => {
    return this.queryService.query(GetAllBikes);
  };

  getBikeById = async (id: string) => {
    return this.queryService.query(GetBikeById(id));
  };
}