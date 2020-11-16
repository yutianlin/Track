import {Moment} from "moment-timezone";

export enum NotificationCategory {
  EMAIL = "email",
  IN_APP = "in app",
  TEXT = "text"
}

export interface NotificationModel {
  notification_id: number,
  notification_time: Moment,
  is_read: boolean,
  category: NotificationCategory,
  subject_line?: string,
  body: string
}
