import JoinService from "./join.service";

const BodyParser = require("body-parser");

const jsonParser = BodyParser.json();

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

  app.get("/scheduled_class_info/:scheduled_class_id", async (request: any, response: any) => {
    const scheduled_class_id = request.params.scheduled_class_id;
    response.json(await joinService.getScheduledClassDayInfo(scheduled_class_id));
  })

  app.get("/peron_entrance_room_building_time", jsonParser, async (request: any, response: any) => {
    const requestBody = request.body.data;
    response.json(await joinService.getPersonEntranceRoomBuildingTimeInfo(requestBody));
  });

  app.get("/bubble_count_by_term/:searchTerm", async (request: any, response: any) => {
    const searchTerm = request.params.searchTerm;
    response.json(await joinService.getBubbleCountBySearchTerm(searchTerm));
  })

  app.get("/largest_scheduled_class", async (request: any, response: any) => {
    response.json(await joinService.getLargestScheduledClass())
  })

  app.get("/notifications_unread/:person_id", async (request: any, response: any) => {
    const person_id = request.params.person_id;
    response.json(await joinService.getAllUnreadNotificationsByPersonId(person_id));
  });

  app.get("/scheduled_class_info/person_id/:person_id", async (request: any, response: any) => {
    const person_id = request.params.person_id;
    response.json(await joinService.getScheduledClassDayInfoByPersonId(person_id));
  });
};
