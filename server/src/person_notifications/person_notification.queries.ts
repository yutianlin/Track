import {GetAllRowsFromTable, UpdateRow} from "../helpers/queries";

import { PERSON_NOTIFICATION_TABLE } from "../helpers/tables";
import {stringify} from "../helpers/helpers";

const { tableName, columns } = PERSON_NOTIFICATION_TABLE;

export const GetAllRelations = () => GetAllRowsFromTable(tableName);

export const MarkNotificationAsRead = (person_id: string, notification_id: string) => {
  return UpdateRow(
    tableName,
    `${columns.is_read.getName()} = TRUE`,
    `${columns.notification_id.getName()} = ${stringify(notification_id)} AND
    ${columns.person_id.getName()} = ${person_id}`
  );
}
