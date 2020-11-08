import QueryService from "../QueryService";
import {
  GetAllNotifications,
  GetNotificationById,
} from "./notification.queries";

export default class Faculty {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllNotifications = async () => {
    return this.queryService.query(GetAllNotifications);
  };

  getNotificationById = async (id: number) => {
    return this.queryService.query(GetNotificationById(id));
  };
}
