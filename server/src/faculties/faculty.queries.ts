import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
} from "../helpers/queries";

import { FACULTY_TABLE } from "../helpers/tables";

const { tableName, facultyId } = FACULTY_TABLE;

export const GetAllFaculties = GetAllRowsFromTable(tableName);

export const GetFacultyById = (id: number) =>
  GetRowsWithSelection(tableName, `${facultyId} = ${id}`);

export const CreateFaculty = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const UpdateFacultyById = (valuePairs: string, id: number) =>
  UpdateRow(tableName, valuePairs, `${facultyId} = ${id}`);
