import QueryService from "../QueryService";
import { GetAllBuildings, GetBuildingByCode } from "./building.queries";

export default class Building {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllBuildings = async () => {
    return this.queryService.query(GetAllBuildings);
  };

  getBuildingByCode = async (code: string) => {
    return this.queryService.query(GetBuildingByCode(code));
  };
}
