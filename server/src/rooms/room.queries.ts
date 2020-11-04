import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import { ROOM_TABLE as R } from "../helpers/tables";

export const GetAllRooms = GetAllRowsFromTable(R.tableName);

export const GetRoomByNumber = (building: string, roomNum: string) =>
  GetRowsWithSelection(
    R.tableName,
    `${R.buildingCode.getName()} = ${stringify(building)} AND ${R.roomNumber.getName()} = ${stringify(
      roomNum
    )}`
  );
