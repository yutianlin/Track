import PersonBikeService from "./person_bike.service";
import {createRelationSchema} from "./person_bike.schema";

const BodyParser = require("body-parser");
const jsonParser = BodyParser.json();

const personBikeService = new PersonBikeService();

module.exports = function (app: any) {
  app.get("/person_bikes", async (request: any, response: any) =>
    response.json(await personBikeService.getAllRelations())
  );

  app.get("/person_bikes/:id", async (request: any, response: any) => {
    const id = request.params.id;
    try {
      response.json(await personBikeService.getRelationsByPersonId(id));
    } catch (e) {
      response.status(422).json(e.message);
    }
  });

  app.post("/person_bikes", jsonParser, async (request: any, response: any) => {
    const {value, error} = await createRelationSchema.validate(
      request.body.data
    );
    if (error) {
      response.status(422).json(error);
      return;
    }
    try {
      response.json(await personBikeService.createRelation(value));
    } catch (e) {
      response.status(422).json(e.message);
    }
  });
};
