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
            ON ${ENTRANCE.tableName}.${ROOM.roomNumber} = ${ROOM.tableName}.${ROOM.roomNumber}
        INNER JOIN ${BUILDING.tableName} 
            ON ${ENTRANCE.tableName}.${BUILDING.buildingCode} = ${BUILDING.tableName}. ${BUILDING.buildingCode}
        INNER JOIN ${POSTAL.tableName} 
            ON ${BUILDING.tableName}.${POSTAL.postalCode} = ${POSTAL.tableName}.${POSTAL.postalCode}`,
    `${ENTRANCE.id} = ${id}`
  );

export const GetPersonAndFacultyInfoById = (id: number) =>
    GetRowsWithSelection(
        `${PERSON.tableName} 
        LEFT JOIN ${FACULTY.tableName} 
            ON ${PERSON.tableName}.${FACULTY.id} = ${FACULTY.tableName}.${FACULTY.id}`,
        `${PERSON.id} = ${id}`
    );