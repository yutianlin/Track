import { GetAllRowsFromTable, InsertRow } from "../helpers/queries";

import { PERSON_NOTIFICATION_TABLE } from "../helpers/tables";

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
