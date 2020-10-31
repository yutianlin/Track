import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
} from "../helpers/queries";

import { PERSON_TABLE } from "../helpers/tables";

const { tableName, personId } = PERSON_TABLE;

export const GetAllPersons = GetAllRowsFromTable(tableName);

export const GetPersonById = (id: number) =>
  GetRowsWithSelection(tableName, `${personId} = ${id}`);

export const CreatePerson = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const UpdatePersonById = (valuePairs: string, id: number) =>
  UpdateRow(tableName, valuePairs, `${personId} = ${id}`);
