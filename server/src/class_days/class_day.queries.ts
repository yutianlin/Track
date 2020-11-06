import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";

import { CLASS_DAY_TABLE } from "../helpers/tables";

const { tableName } = CLASS_DAY_TABLE;

export const GetAllClasses = GetAllRowsFromTable(tableName);
