import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import { POSTAL_TABLE as P } from "../helpers/tables";

export const GetAllPostals = GetAllRowsFromTable(P.tableName);

export const GetPostalByCode = (code: string) =>
  GetRowsWithSelection(P.tableName, `${P.postalCode.getName()} = ${stringify(code)}`);
