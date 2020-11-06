import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";

import { SCHEDULED_CLASS_TABLE } from "../helpers/tables";

const {tableName, columns} = SCHEDULED_CLASS_TABLE;

export const GetAllScheduledClasses = GetAllRowsFromTable(tableName);
