import PersonService from "./person.service";
import { createPersonSchema, updatePersonSchema } from "./person.schema";

const BodyParser = require('body-parser');

const jsonParser = BodyParser.json()

const personService = new PersonService();

module.exports = function (app: any) {
  app.get("/persons", async (request: any, response: any) =>
    response.json(await personService.getPersons())
  );

  app.get("/persons/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await personService.getPersonById(id));
  });

  app.post("/persons", jsonParser, async (request: any, response: any) => {
    const { value, error } = await createPersonSchema.validate(request.body.data);
    if (error) {
      response.json({error: error});
      return;
    }
    response.json(await personService.createPerson(value));
  });

  app.put("/persons/:id", jsonParser, async (request: any, response: any) => {
    const { value, error } = await updatePersonSchema.validate(request.body.data);
    if (error) {
      response.json({error: error});
      return;
    }
    response.json(await personService.updatePerson(value));
  });
};
