import { GetAllRowsFromTable, InsertRow } from "../helpers/queries";

import { PERSON_BIKE_TABLE as PB } from "../helpers/tables";

export const GetAllRelations = () => GetAllRowsFromTable(PB.tableName);

export const CreateRelation = (properties: string, values: string) =>
  InsertRow(PB.tableName, properties, values);
