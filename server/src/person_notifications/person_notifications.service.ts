import QueryService from "../QueryService";
import { GetAllRelations } from "./person_notification.queries";

export default class PersonDateEntranceService {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllRelations = async () => {
    return this.queryService.query(GetAllRelations());
  };
}
