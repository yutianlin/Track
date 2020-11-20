import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
} from "../helpers/queries";
import { NOTIFICATION_TABLE } from "../helpers/tables";

const { tableName, columns } = NOTIFICATION_TABLE;

export const GetAllNotifications = GetAllRowsFromTable(tableName);

export const GetNotificationById = (id: number) =>
  GetRowsWithSelection(
    tableName,
    `${columns.notification_id.getName()} = ${id}`
  );

export const CreateNotification = (
  type: `'text'` | `'email'` | `'inApp'`,
  subjectLine: string | null,
  body: string
) =>
  InsertRow(
    tableName,
    `${columns.category.getName()}, ${columns.subject_line.getName()}, ${columns.body.getName()}`,
    `${type}, ${subjectLine}, ${body}`
  );
