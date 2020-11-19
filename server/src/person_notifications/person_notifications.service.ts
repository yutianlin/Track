import QueryService from "../QueryService";
import {GetAllRelations, MarkNotificationAsRead} from "./person_notification.queries";

export default class PersonDateEntranceService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllRelations = async () => {
    return this.queryService.query(GetAllRelations());
  };

  markNotificationAsRead = async (notification_id: string, person_id: string) => {
    return this.queryService.query(MarkNotificationAsRead(person_id, notification_id));
  }
}
