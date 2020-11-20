import { GetAllRowsFromTable, InsertRow, UpdateRow } from "../helpers/queries";

import { PERSON_NOTIFICATION_TABLE } from "../helpers/tables";
import {stringify} from "../helpers/helpers";

const { tableName, columns } = PERSON_NOTIFICATION_TABLE;

export const GetAllRelations = () => GetAllRowsFromTable(tableName);

export const CreateRelation = (
  personId: number,
  notificationId: number,
  time: string
) =>
  InsertRow(
    tableName,
    `${columns.person_id.getName()}, ${columns.notification_id.getName()}, ${columns.is_read.getName()}, ${columns.notification_time.getName()}`,
    `${personId}, ${notificationId}, false, ${time}`
  );
export const MarkNotificationAsRead = (person_id: string, notification_id: string) => {
  return UpdateRow(
    tableName,
    `${columns.is_read.getName()} = TRUE`,
    `${columns.notification_id.getName()} = ${stringify(notification_id)} AND
    ${columns.person_id.getName()} = ${person_id}`
  );
}
