import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
} from "../helpers/queries";

import { FACULTY_TABLE as F } from "../helpers/tables";

export const GetAllFaculties = GetAllRowsFromTable(F.tableName);

export const GetFacultyById = (id: number) =>
  GetRowsWithSelection(F.tableName, `${F.id} = ${id}`);

export const CreateFaculty = (properties: string, values: string) =>
  InsertRow(F.tableName, properties, values);

export const UpdateFacultyById = (valuePairs: string, id: number) =>
  UpdateRow(F.tableName, valuePairs, `${F.id} = ${id}`);
