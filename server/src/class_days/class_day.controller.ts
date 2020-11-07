import ClassDayService from "./class_day.service";

const classDayService = new ClassDayService();

module.exports = function (app: any) {
  app.get("/class_days", async (request: any, response: any) => {
    response.json(await classDayService.getAllClassDays());
  });
};
