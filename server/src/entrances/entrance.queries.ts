import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";

import { ENTRANCE_TABLE } from "../helpers/tables";

const { tableName, entranceId } = ENTRANCE_TABLE;

export const GetAllEntrances = GetAllRowsFromTable(tableName);

export const GetEntranceById = (id: number) =>
  GetRowsWithSelection(tableName, `${entranceId} = ${id}`);
