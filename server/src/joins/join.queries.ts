import { GetRowsWithSelection } from "../helpers/queries";

import {
  ENTRANCE_TABLE as ENTRANCE,
  ROOM_TABLE as ROOM,
  BUILDING_TABLE as BUILDING,
  POSTAL_TABLE as POSTAL,
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
