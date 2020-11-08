import BubblePersonService from "./person_bubble.service";
import { createBubblePersonSchema } from "./person_bubble.schema";

const BodyParser = require("body-parser");

const jsonParser = BodyParser.json();

const bubblePersonService = new BubblePersonService();

module.exports = function (app: any) {
  app.get("/person_bubbles", async (request: any, response: any) => {
    response.json(await bubblePersonService.getAllPersonBubbles());
  });

  app.post(
    "/person_bubbles",
    jsonParser,
    async (request: any, response: any) => {
      const { value, error } = await createBubblePersonSchema.validate(
        request.body.data
      );
      if (error) {
        response.status(422).json(error.message);
        return;
      }
      try {
        response.json(await bubblePersonService.createPersonBubble(value));
      } catch (e) {
        response.status(422).json(e.message);
      }
    }
  );

  app.delete(
    "/person_bubbles/person_id/:personId/bubble_id/:bubbleId",
    async (request: any, response: any) => {
      const { personId, bubbleId } = request.params;
      response.json(
        await bubblePersonService.deletePersonBubble(personId, bubbleId)
      );
    }
  );
};
