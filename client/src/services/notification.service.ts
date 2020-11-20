import {RemoteService} from "./remote.service";
import {NotificationModel} from "../model/notification";
import {NotificationConversions} from "../conversions/notification.conversions";

class NotificationService extends RemoteService {
  public async getNotifications(personId: number): Promise<NotificationModel[]> {
    const response = await this.get(`/person_notification_messages_info/${personId}`);
    return response.data.map(NotificationConversions.toNotificationModel);
  }

  public async getUnreadNotifications(personId: number | string): Promise<NotificationModel[]> {
    const response = await this.get(`/inApp_notifications_unread/${personId}`);
    return response.data;
  }

  public async markNotificationAsRead(personId: number | string, notification_id: number): Promise<void> {
    await this.patch(`/person_notifications/read/notification_id/${notification_id}/person_id/${personId}`, {});
  }
}

export const notificationService = new NotificationService();
