import QueryService from "../QueryService";
import { GetAllScheduledClasses } from "./scheduled_class.queries";

export default class Room {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllScheduledClasses = async () => {
    return this.queryService.query(GetAllScheduledClasses);
  };
}
