import FacultyService from "./faculty.service";
import { createFacultySchema, updateFacultySchema } from "./faculty.schema";

const BodyParser = require("body-parser");
const jsonParser = BodyParser.json();

const facultyService = new FacultyService();

module.exports = function (app: any) {
  app.get("/faculties", async (request: any, response: any) => {
    response.json(await facultyService.getAllFaculties());
  });

  app.get("/faculties/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await facultyService.getFacultyById(id));
  });

  app.post("/faculties", jsonParser, async (request: any, response: any) => {
    const { value, error } = await createFacultySchema.validate(
      request.body.data
    );

    if (error) {
      response.status(422).json(error);
      return;
    }

    try {
      response.json(await facultyService.createFaculty(value));
    } catch (e) {
      response.status(422).json(e.message);
    }
  });

  app.patch(
    "/faculties/:id",
    jsonParser,
    async (request: any, response: any) => {
      const id = request.params.id;
      const { value, error } = await updateFacultySchema.validate(
        request.body.data
      );

      if (error) {
        response.status(422).json(error);
        return;
      }

      try {
        response.json(await facultyService.updateFacultyById(id, value));
      } catch (e) {
        response.status(422).json(e.message);
      }
    }
  );
};
