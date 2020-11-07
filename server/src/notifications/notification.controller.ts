import NotificationService from "./notification.service";

const notificationService = new NotificationService();

module.exports = function (app: any) {
  app.get("/notifications", async (request: any, response: any) => {
    response.json(await notificationService.getAllNotifications());
  });

  app.get("/notifications/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await notificationService.getNotificationById(id));
  });
};
