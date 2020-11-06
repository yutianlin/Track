import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";

import { ENTRANCE_TABLE as E } from "../helpers/tables";

export const GetAllEntrances = GetAllRowsFromTable(E.tableName);

export const GetEntranceById = (id: number) =>
  GetRowsWithSelection(
    E.tableName,
    `${E.columns.entrance_id.getName()} = ${id}`
  );
