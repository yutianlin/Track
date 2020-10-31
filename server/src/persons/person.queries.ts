import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
} from "../helpers/queries";

const PERSON_TABLE = {
  tableName: "person",
  personId: "person_id",
};

export const GetAllPersons = GetAllRowsFromTable(PERSON_TABLE.tableName);

export const GetPersonById = (id: number) =>
  GetRowsWithSelection(
    PERSON_TABLE.tableName,
    `${PERSON_TABLE.personId} = ${id}`
  );

export const CreatePerson = (properties: string, values: string) =>
  InsertRow(PERSON_TABLE.tableName, properties, values);

export const UpdatePersonById = (valuePairs: string, id: number) =>
  UpdateRow(
    PERSON_TABLE.tableName,
    valuePairs,
    `${PERSON_TABLE.personId} = ${id}`
  );
