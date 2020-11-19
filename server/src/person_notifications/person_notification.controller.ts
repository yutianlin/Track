import PersonNotificationService from "./person_notifications.service";

const personNotificationService = new PersonNotificationService();

module.exports = function (app: any) {
  app.get("/person_notifications", async (request: any, response: any) =>
    response.json(await personNotificationService.getAllRelations())
  );

  app.patch("/person_notifications/read/notification_id/:notification_id/person_id/:person_id", async (request: any, response: any) => {
    const { notification_id, person_id } = request.params;
    response.json(await personNotificationService.markNotificationAsRead(notification_id, person_id))
  });
};
