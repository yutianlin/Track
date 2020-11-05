import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import { BIKE_TABLE as B} from "../helpers/tables";

export const GetAllBikes = GetAllRowsFromTable(B.tableName);

export const GetBikeById = (id: string) => GetRowsWithSelection(B.tableName, `${B.columns.id.getName()} = ${stringify(id)}`);
