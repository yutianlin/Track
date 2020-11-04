import { GetRowsWithSelection } from "../helpers/queries";

import {
  ENTRANCE_TABLE as ENTRANCE,
  ROOM_TABLE as ROOM,
  BUILDING_TABLE as BUILDING,
  POSTAL_TABLE as POSTAL,
  PERSON_TABLE as PERSON,
  FACULTY_TABLE as FACULTY
} from "../helpers/tables";

export const GetEntranceInfoById = (id: number) =>
  GetRowsWithSelection(
    `${ENTRANCE.tableName} 
        LEFT JOIN ${ROOM.tableName} 
            ON ${ENTRANCE.tableName}.${ROOM.roomNumber.getName()} = ${ROOM.tableName}.${ROOM.roomNumber.getName()}
        INNER JOIN ${BUILDING.tableName} 
            ON ${ENTRANCE.tableName}.${BUILDING.buildingCode.getName()} = ${BUILDING.tableName}. ${BUILDING.buildingCode.getName()}
        INNER JOIN ${POSTAL.tableName} 
            ON ${BUILDING.tableName}.${POSTAL.postalCode.getName()} = ${POSTAL.tableName}.${POSTAL.postalCode.getName()}`,
    `${ENTRANCE.id.getName()} = ${id}`
  );

export const GetPersonAndFacultyInfoById = (id: number) =>
    GetRowsWithSelection(
        `${PERSON.tableName} 
        LEFT JOIN ${FACULTY.tableName} 
            ON ${PERSON.tableName}.${FACULTY.id.getName()} = ${FACULTY.tableName}.${FACULTY.id.getName()}`,
        `${PERSON.id.getName()} = ${id}`
    );