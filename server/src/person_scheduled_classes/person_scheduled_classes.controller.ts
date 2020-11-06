import PersonScheduledClassService from "./person_scheduled_classes.service";
import { relationSchema } from "./person_scheduled_classes.schema";

const BodyParser = require("body-parser");

const jsonParser = BodyParser.json();

const personScheduledClassService = new PersonScheduledClassService();

module.exports = function (app: any) {
  app.get("/person_scheduled_classes", async (request: any, response: any) => {
    response.json(await personScheduledClassService.getAllPersonScheduledClasses());
  });

  app.post(
    "/person_scheduled_classes",
    jsonParser,
    async (request: any, response: any) => {
      const { value, error } = await relationSchema.validate(
        request.body.data
      );
      if (error) {
        response.status(422).json(error.message);
        return;
      }
      try {
        response.json(await personScheduledClassService.createPersonScheduledClass(value));
      } catch (e) {
        response.status(422).json(e.message);
      }
    }
  );

  app.delete(
    "/person_scheduled_classes",
    jsonParser,
    async (request: any, response: any) => {
        const { value, error } = await relationSchema.validate(
            request.body.data
        );
        if (error) {
            response.status(422).json(error.message);
            return;
        }
        try {
            response.json(await personScheduledClassService.deletePersonScheduledClass(value));
        } catch (e) {
            response.status(422).json(e.message);
        }
    }
  );
};
