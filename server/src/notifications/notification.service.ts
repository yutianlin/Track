import QueryService from "../QueryService";
import {
  GetAllNotifications,
  GetNotificationById,
  CreateNotification,
} from "./notification.queries";
import { stringify } from "../helpers/helpers";

export default class NotificationService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllNotifications = async () => {
    return this.queryService.query(GetAllNotifications);
  };

  getAllUnreadNotifications = async () => {
    return this.queryService.query(GetAllNotifications);
  };

  getNotificationById = async (id: number) => {
    return this.queryService.query(GetNotificationById(id));
  };

  createInAppNotification = async (message: string) => {
    return this.queryService.query(
      CreateNotification("'inApp'", null, stringify(message))
    );
  };

  createPhoneNotification = async (message: string) => {
    return this.queryService.query(
      CreateNotification("'text'", null, stringify(message))
    );
  }

  createEmailNotification = async (subject: string, message: string) => {
    return this.queryService.query(
      CreateNotification("'email'", stringify(subject), stringify(message))
    );
  }
}
