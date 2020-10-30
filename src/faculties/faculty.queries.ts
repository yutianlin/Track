import {GetAllRowsFromTable, GetRowsWithSelection, InsertRow, UpdateRow} from '../helpers/queries'

const FACULTY_TABLE = {
    tableName: "faculty",
    facultyId: "faculty_id",
};

export const GetAllFaculties = GetAllRowsFromTable(FACULTY_TABLE.tableName);

export const GetFacultyById = (id: number) => GetRowsWithSelection(FACULTY_TABLE.tableName, `${FACULTY_TABLE.facultyId} = ${id}`);

export const CreateFaculty = (properties: string, values: string) => InsertRow(FACULTY_TABLE.tableName, properties, values);

export const UpdateFacultyById = (valuePairs: string, id: number) => UpdateRow(FACULTY_TABLE.tableName, valuePairs, `${FACULTY_TABLE.facultyId} = ${id}`);