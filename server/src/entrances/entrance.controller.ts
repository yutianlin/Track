import EntranceService from "./entrance.service";

const entranceService = new EntranceService();

module.exports = function (app: any) {
  app.get("/entrances", async (request: any, response: any) => {
    response.json(await entranceService.getAllEntrances());
  });

  app.get("/entrances/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await entranceService.getEntranceById(id));
  });
};
