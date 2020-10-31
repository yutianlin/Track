import BuildingService from "./building.service";

const buildingService = new BuildingService();

module.exports = function (app: any) {
  app.get("/buildings", async (request: any, response: any) => {
    response.json(await buildingService.getAllBuildings());
  });

  app.get("/buildings/:code", async (request: any, response: any) => {
    const code = request.params.code;
    response.json(await buildingService.getBuildingByCode(code));
  });
};
