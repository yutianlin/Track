import BubbleService from "./bubble.service";
import { createBubbleSchema, updateBubbleSchema } from "./bubble.schema";

const BodyParser = require("body-parser");

const jsonParser = BodyParser.json();

const bubbleService = new BubbleService();

module.exports = function (app: any) {
  app.get("/bubbles", async (request: any, response: any) => {
    response.json(await bubbleService.getAllBubbles());
  });

  app.get("/bubbles/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await bubbleService.getBubbleById(id));
  });

  app.post("/bubbles", jsonParser, async (request: any, response: any) => {
    const { value, error } = await createBubbleSchema.validate(
      request.body.data
    );
    if (error) {
      response.status(422).json(error.message);
      return;
    }
    try {
      response.json(await bubbleService.createBubble(value));
    } catch (e) {
      response.status(422).json(e.message);
    }
  });

  app.patch("/bubbles/:id", jsonParser, async (request: any, response: any) => {
    const id = request.params.id;
    const { value, error } = await updateBubbleSchema.validate(
      request.body.data
    );
    if (error) {
      response.status(422).json(error.message);
      return;
    }
    try {
      response.json(await bubbleService.updateBubbleById(id, value));
    } catch (e) {
      response.status(422).json(e.message);
    }
  });
};
