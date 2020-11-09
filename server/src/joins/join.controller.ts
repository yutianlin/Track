import JoinService from "./join.service";

const joinService = new JoinService();

module.exports = function (app: any) {
  app.get("/entrance_info/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await joinService.getEntranceInfoById(id));
  });

  app.get("/person_faculty_info/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await joinService.getPersonAndFacultyInfoById(id));
  });

  app.get("/covid_test_info/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await joinService.getAllCovidTestInfoByPersonId(id));
  });

  app.get("/person_bike_info/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await joinService.getAllBikeInfoByPersonId(id));
  });

  app.get("/person_notification_messages_info/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await joinService.getAllPersonNotificationInfoById(id));
  });

  app.get("/covid_testing_centre_info/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await joinService.getCovidTestingCentreInfoById(id));
  });

  // app.get("/scheduled_class_info/:dept/:code/:section/:term/:year", async (request: any, response: any) => {
  //   const dept = request.params.dept;
  //   const code = request.params.code;
  //   const section = request.params.section;
  //   const term = request.params.term;
  //   const year = request.params.year;
  //
  //   response.json(await joinService.getScheduledClassDayInfo(dept, code, section, term, year));
  // })

};
