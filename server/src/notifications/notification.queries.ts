import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";

import { NOTIFICATION_TABLE } from "../helpers/tables";

const { tableName, columns } = NOTIFICATION_TABLE;

export const GetAllNotifications = GetAllRowsFromTable(tableName);

export const GetNotificationById = (id: number) =>
  GetRowsWithSelection(
    tableName,
    `${columns.notification_id.getName()} = ${id}`
  );
