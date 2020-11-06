import PersonNotificationService from "./person_notifications.service";

const personNotificationService = new PersonNotificationService();

module.exports = function (app: any) {
  app.get("/person_notifications", async (request: any, response: any) =>
    response.json(await personNotificationService.getAllRelations())
  );
};
