import JoinService from "./join.service";

const joinService = new JoinService();

module.exports = function (app: any) {
  app.get("/entrance_info/:entrance_id", async (request: any, response: any) => {
    const entrance_id = request.params.entrance_id;
    response.json(await joinService.getEntranceInfoById(entrance_id));
  });

  app.get("/person_faculty_info/:person_id", async (request: any, response: any) => {
    const person_id = request.params.person_id;
    response.json(await joinService.getPersonAndFacultyInfoById(person_id));
  });

  app.get("/covid_test_info/:person_id", async (request: any, response: any) => {
    const person_id = request.params.person_id;
    response.json(await joinService.getAllCovidTestInfoByPersonId(person_id));
  });

  app.get("/person_bike_info/:person_id", async (request: any, response: any) => {
    const person_id = request.params.person_id;
    response.json(await joinService.getAllBikeInfoByPersonId(person_id));
  });

  app.get("/person_notification_messages_info/:person_id", async (request: any, response: any) => {
    const person_id = request.params.person_id;
    response.json(await joinService.getAllPersonNotificationInfoById(person_id));
  });

  app.get("/covid_testing_centre_info/:covid_testing_centre_id", async (request: any, response: any) => {
    const covid_testing_centre_id = request.params.covid_testing_centre_id;
    response.json(await joinService.getCovidTestingCentreInfoById(covid_testing_centre_id));
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
