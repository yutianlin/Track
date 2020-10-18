import PersonService from "./person.service";
import { createPersonSchema } from "./person.schema";

const BodyParser = require('body-parser');

const jsonParser = BodyParser.json()

const personService = new PersonService();

module.exports = function (app: any) {
  app.get("/persons", async (request: any, response: any) =>
    response.json(await personService.getPersons())
  );

  app.get("/person/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await personService.getPersonById(id));
  });

  app.post("/person", jsonParser, async (request: any, response: any) => {
    const { value, error } = await createPersonSchema.validate(request.body.data);
    if (error) {
      response.json({error: error});
      return;
    }
    response.json(await personService.createPerson(value));
  })
};
