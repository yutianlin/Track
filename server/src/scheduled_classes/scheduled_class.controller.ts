import ScheduledClassService from "./scheduled_class.service";

const roomService = new ScheduledClassService();

module.exports = function (app: any) {
  app.get("/scheduled_classes", async (request: any, response: any) => {
    response.json(await roomService.getAllScheduledClasses());
  });
};
