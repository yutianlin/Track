import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import { BUILDING_TABLE } from "../helpers/tables";

const { tableName, buildingCode } = BUILDING_TABLE;

export const GetAllBuildings = GetAllRowsFromTable(tableName);

export const GetBuildingByCode = (code: string) =>
  GetRowsWithSelection(tableName, `${buildingCode} = ${stringify(code)}`);
