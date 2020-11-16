import QueryService from "../QueryService";
import {
  GetAllBikes,
  GetBikeById,
  ToggleBikeRentableStatus,
} from "./bike.queries";

export default class Building {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllBikes = async () => {
    return this.queryService.query(GetAllBikes);
  };

  getBikeById = async (id: string) => {
    return this.queryService.query(GetBikeById(id));
  };

  rentBikeIfAvailable = async (id: string) => {
    return this.queryService.query(ToggleBikeRentableStatus(id, false));
  };
}
