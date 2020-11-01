import BikeService from "./bike.service";

const bikeService = new BikeService();

module.exports = function (app: any) {
  app.get("/bikes", async (request: any, response: any) => {
    response.json(await bikeService.getAllBikes());
  });

  app.get("/bikes/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await bikeService.getBikeById(id));
  });
};
