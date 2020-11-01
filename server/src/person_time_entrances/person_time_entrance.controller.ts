import PersonDateEntranceService from "./person_time_entrance.service";
import { createRelationSchema } from "./person_time_entrance.schema";

const BodyParser = require("body-parser");
const jsonParser = BodyParser.json();

const personDateEntranceService = new PersonDateEntranceService();

module.exports = function (app: any) {
  app.get("/person_time_entrances", async (request: any, response: any) =>
    response.json(await personDateEntranceService.getAllRelations())
  );

  app.post(
    "/person_time_entrances",
    jsonParser,
    async (request: any, response: any) => {
      const { value, error } = await createRelationSchema.validate(
        request.body.data
      );
      if (error) {
        response.status(422).json(error);
        return;
      }
      try {
        response.json(await personDateEntranceService.createRelation(value));
      } catch (e) {
        response.status(422).json(e.message);
      }
    }
  );
};
