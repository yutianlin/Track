import RoomService from "./room.service";

const roomService = new RoomService();

module.exports = function (app: any) {
  app.get("/rooms", async (request: any, response: any) => {
    response.json(await roomService.getAllRooms());
  });

  app.get("/rooms/:building_code/:room_number", async (request: any, response: any) => {
    const { building_code, room_number } = request.params;
    response.json(await roomService.getRoomByNumber(building_code, room_number));
  });
};
