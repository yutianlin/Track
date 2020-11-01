import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import { POSTAL_TABLE } from "../helpers/tables";

const { tableName, postalCode } = POSTAL_TABLE;

export const GetAllPostals = GetAllRowsFromTable(tableName);

export const GetPostalByCode = (code: string) =>
  GetRowsWithSelection(tableName, `${postalCode} = ${stringify(code)}`);
