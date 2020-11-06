import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import { BUILDING_TABLE as B } from "../helpers/tables";

export const GetAllBuildings = GetAllRowsFromTable(B.tableName);

export const GetBuildingByCode = (code: string) =>
  GetRowsWithSelection(
    B.tableName,
    `${B.columns.building_code.getName()} = ${stringify(code)}`
  );
