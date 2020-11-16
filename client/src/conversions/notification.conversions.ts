import {NotificationModel} from "../model/notification";
import {toMoment} from "./conversions.util";

export class NotificationConversions {
  public static toNotificationModel(notification: any): NotificationModel {
    const notificationTimeObject = {
      notification_time: toMoment(notification.notification_time)
    };
    return {...notification, ...notificationTimeObject};
  }
}
