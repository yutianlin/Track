import {RemoteService} from "./remote.service";
import {NotificationModel} from "../model/notification";
import {NotificationConversions} from "../conversions/notification.conversions";

class NotificationService extends RemoteService {
  public async getNotifications(personId: number): Promise<NotificationModel[]> {
    const response = await this.get(`/person_notification_messages_info/${personId}`);
    return response.data.map(NotificationConversions.toNotificationModel);
  }
}

export const notificationService = new NotificationService();
