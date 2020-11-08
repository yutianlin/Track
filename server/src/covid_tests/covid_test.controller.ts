import CovidTestService from "./covid_test.service";
import {
  createCovidTestSchema,
  updateCovidTestSchema,
} from "./covid_test.schema";

const BodyParser = require("body-parser");

const jsonParser = BodyParser.json();

const covidTestService = new CovidTestService();

module.exports = function (app: any) {
  app.get("/covid_tests", async (request: any, response: any) => {
    response.json(await covidTestService.getAllCovidTests());
  });

  app.patch(
    "/covid_tests/person_id/:personId/test_centre_id/:testCentreId/input_time/:inputTime",
    jsonParser,
    async (request: any, response: any) => {
      const { personId, testCentreId, inputTime } = request.params;
      const { value, error } = await updateCovidTestSchema.validate(
        request.body.data
      );
      if (error) {
        response.status(422).json(error.message);
        return;
      }
      try {
        response.json(
          await covidTestService.updateCovidTestByPK(
            personId,
            inputTime,
            testCentreId,
            value
          )
        );
      } catch (e) {
        response.status(422).json(e.message);
      }
    }
  );

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
};
