import CovidTestService from "./covid_test.service";
import { createCovidTestSchema } from "./covid_test.schema";

const BodyParser = require("body-parser");

const jsonParser = BodyParser.json();

const covidTestService = new CovidTestService();

module.exports = function (app: any) {
  app.post("/covid_tests", jsonParser, async (request: any, response: any) => {
    const { value, error } = await createCovidTestSchema.validate(
      request.body.data
    );
    if (error) {
      response.status(422).json(error.message);
      return;
    }
    try {
      response.json(await covidTestService.createCovidTest(value));
    } catch (e) {
      response.status(422).json(e.message);
    }
  });

  app.get("/covid_tests", async (request: any, response: any) => {
    response.json(await covidTestService.getAllCovidTests());
  });
};
