import {NotificationCategory, NotificationModel} from "../model/notification";
import {toMoment} from "./conversions.util";

export class NotificationConversions {
  public static toNotificationModel(notification: any): NotificationModel {
    let category: NotificationCategory;
    switch(notification.category) {
      case "inApp":
        category = NotificationCategory.IN_APP;
        break;
      case "email":
        category = NotificationCategory.EMAIL;
        break;
      default:
        category = NotificationCategory.TEXT;
        break;
    }
    const notificationTimeObject = {
      notification_time: toMoment(notification.notification_time),
      category: category
    };
    return {...notification, ...notificationTimeObject};
  }
}
