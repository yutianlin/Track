import {GetAllRowsFromTable, GetRowsWithSelection, UpdateRow} from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import { BIKE_TABLE as B } from "../helpers/tables";

export const GetAllBikes = GetAllRowsFromTable(B.tableName);

export const GetBikeById = (id: string) =>
  GetRowsWithSelection(
    B.tableName,
    `${B.columns.shared_bike_id.getName()} = ${stringify(id)}`
  );

export const ToggleBikeRentableStatus = (id: string, status: boolean) => {
  return UpdateRow(
    B.tableName,
    `${B.columns.is_rentable.getName()} = ${status}`,
    `${B.columns.shared_bike_id.getName()} = ${stringify(id)} AND ${B.columns.is_rentable.getName()} = ${!status}`
  );
}

