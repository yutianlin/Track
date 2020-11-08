import QueryService from "../QueryService";
import { GetAllPostals, GetPostalByCode } from "./postal.queries";

export default class Building {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllPostals = async () => {
    return this.queryService.query(GetAllPostals);
  };

  getPostalByCode = async (code: string) => {
    return this.queryService.query(GetPostalByCode(code));
  };
}
