import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import { ROOM_TABLE } from "../helpers/tables";

const { tableName, roomNumber, buildingCode } = ROOM_TABLE;

export const GetAllRooms = GetAllRowsFromTable(tableName);

export const GetRoomByNumber = (building: string, roomNum: string) =>
  GetRowsWithSelection(
    tableName,
    `${buildingCode} = ${stringify(building)} AND ${roomNumber} = ${stringify(
      roomNum
    )}`
  );
