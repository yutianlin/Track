import PostalService from "./postal.service";

const postalService = new PostalService();

module.exports = function (app: any) {
  app.get("/postal_addresses", async (request: any, response: any) => {
    response.json(await postalService.getAllPostals());
  });

  app.get("/postal_addresses/:code", async (request: any, response: any) => {
    const code = request.params.code;
    response.json(await postalService.getPostalByCode(code));
  });
};
