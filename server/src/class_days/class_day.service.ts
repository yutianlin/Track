import QueryService from "../QueryService";
import { GetAllClasses } from "./class_day.queries";

export default class Building {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllClassDays = async () => {
    return this.queryService.query(GetAllClasses);
  };
}
