import QueryService from "../QueryService";
import { GetAllRooms, GetRoomByNumber } from "./room.queries";

export default class Room {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllRooms = async () => {
    return this.queryService.query(GetAllRooms);
  };

  getRoomByNumber = async (buildingCode: string, roomNum: string) => {
    return this.queryService.query(GetRoomByNumber(buildingCode, roomNum));
  };
}
