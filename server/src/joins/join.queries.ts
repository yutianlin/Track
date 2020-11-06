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
            ON ${ENTRANCE.tableName}.${ROOM.columns.room_number.getName()} = ${
      ROOM.tableName
    }.${ROOM.columns.room_number.getName()}
        INNER JOIN ${BUILDING.tableName} 
            ON ${
              ENTRANCE.tableName
            }.${BUILDING.columns.building_code.getName()} = ${
      BUILDING.tableName
    }. ${BUILDING.columns.building_code.getName()}
        INNER JOIN ${POSTAL.tableName} 
            ON ${
              BUILDING.tableName
            }.${POSTAL.columns.postal_code.getName()} = ${
      POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`,
    `${ENTRANCE.columns.entrance_id.getName()} = ${id}`
  );

export const GetPersonAndFacultyInfoById = (id: number) =>
  GetRowsWithSelection(
    `${PERSON.tableName} 
        LEFT JOIN ${FACULTY.tableName} 
            ON ${PERSON.tableName}.${FACULTY.columns.faculty_id.getName()} = ${
      FACULTY.tableName
    }.${FACULTY.columns.faculty_id.getName()}`,
    `${PERSON.columns.person_id.getName()} = ${id}`
  );
