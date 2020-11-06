import { GetAllRowsFromTable, InsertRow } from "../helpers/queries";

import { PERSON_TIME_ENTRANCE_TABLE as P } from "../helpers/tables";

export const GetAllRelations = () => GetAllRowsFromTable(P.tableName);

export const CreateRelation = (properties: string, values: string) =>
  InsertRow(P.tableName, properties, values);
