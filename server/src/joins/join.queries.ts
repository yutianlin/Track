import { GetRowsWithSelection } from "../helpers/queries";

import {
  ENTRANCE_TABLE as ENTRANCE,
  ROOM_TABLE as ROOM,
  BUILDING_TABLE as BUILDING,
  POSTAL_TABLE as POSTAL,
  PERSON_TABLE as PERSON,
  FACULTY_TABLE as FACULTY,
} from "../helpers/tables";

export const GetEntranceInfoById = (id: number) =>
  GetRowsWithSelection(
    `${ENTRANCE.tableName} 
        LEFT JOIN ${ROOM.tableName} 
            ON ${ENTRANCE.tableName}.${ROOM.columns.roomNumber.getName()} = ${
      ROOM.tableName
    }.${ROOM.columns.roomNumber.getName()}
        INNER JOIN ${BUILDING.tableName} 
            ON ${
              ENTRANCE.tableName
            }.${BUILDING.columns.buildingCode.getName()} = ${
      BUILDING.tableName
    }. ${BUILDING.columns.buildingCode.getName()}
        INNER JOIN ${POSTAL.tableName} 
            ON ${BUILDING.tableName}.${POSTAL.columns.postalCode.getName()} = ${
      POSTAL.tableName
    }.${POSTAL.columns.postalCode.getName()}`,
    `${ENTRANCE.columns.id.getName()} = ${id}`
  );

export const GetPersonAndFacultyInfoById = (id: number) =>
  GetRowsWithSelection(
    `${PERSON.tableName} 
        LEFT JOIN ${FACULTY.tableName} 
            ON ${PERSON.tableName}.${FACULTY.columns.id.getName()} = ${
      FACULTY.tableName
    }.${FACULTY.columns.id.getName()}`,
    `${PERSON.columns.person_id.getName()} = ${id}`
  );
