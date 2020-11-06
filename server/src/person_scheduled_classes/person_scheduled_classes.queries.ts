import { GetAllRowsFromTable, InsertRow, DeleteRow } from "../helpers/queries";

import { PERSON_SCHEDULED_CLASS_TABLE } from "../helpers/tables";

const { tableName, columns } = PERSON_SCHEDULED_CLASS_TABLE;

export const GetAllRelations = () => GetAllRowsFromTable(tableName);

export const CreateRelation = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const DeleteRelation = (selection: string) => DeleteRow(tableName, selection);
