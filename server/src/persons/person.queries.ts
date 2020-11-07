import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
} from "../helpers/queries";

import { PERSON_TABLE as P } from "../helpers/tables";

export const GetAllPersons = GetAllRowsFromTable(P.tableName);

export const GetPersonById = (id: number) =>
  GetRowsWithSelection(P.tableName, `${P.columns.person_id.getName()} = ${id}`);

export const CreatePerson = (properties: string, values: string) =>
  InsertRow(P.tableName, properties, values);

export const UpdatePersonById = (valuePairs: string, id: number) =>
  UpdateRow(
    P.tableName,
    valuePairs,
    `${P.columns.person_id.getName()} = ${id}`
  );
