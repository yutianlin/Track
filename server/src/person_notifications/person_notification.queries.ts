import { GetAllRowsFromTable } from "../helpers/queries";

import { PERSON_NOTIFICATION_TABLE } from "../helpers/tables";

const { tableName, columns } = PERSON_NOTIFICATION_TABLE;

export const GetAllRelations = () => GetAllRowsFromTable(tableName);

