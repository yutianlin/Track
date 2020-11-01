import JoinService from "./join.service";

const joinService = new JoinService();

module.exports = function (app: any) {
  app.get("/entrance_info/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await joinService.getEntranceInfoById(id));
  });
};
