import QueryService from "../QueryService";

import {
  GetAllCovidTestInfoByPersonId,
  GetAllCovidTestingCentreInfos,
  GetAllPersonBikeInfoById,
  GetAllPersonNotificationInfoById,
  GetAllUnreadNotificationsByPersonId,
  GetBubbleCountByPersonId,
  GetBubbleCountBySearchTerm,
  GetCovidTestingCentreInfoById,
  GetEntranceInfoById,
  GetFrequentlyUsedBuildings,
  GetLargestScheduledClass,
  GetPersonAllBubbles, GetPersonAllBubblesBySearchTerm,
  GetPersonAndFacultyInfoById,
  GetPersonEntranceRoomBuildingTime,
  GetScheduledClassDayInfo,
  GetScheduledClassDayInfoByPersonId,
  GetPersonsUsedSameRoomAsAPersonByEntrance,
  GetPersonsUsedSameRoomAsAPersonByClass,
  GetPersonsUsedBuildingsUsedByAPerson,
} from "./join.queries";
import {
  getProjectionsFromJson,
  getSelectionsFromJson,
} from "../helpers/helpers";

export default class JoinService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getEntranceInfoById = (entrance_id: number) => {
    return this.queryService.query(GetEntranceInfoById(entrance_id));
  };

  getPersonAndFacultyInfoById = (person_id: number) => {
    return this.queryService.query(GetPersonAndFacultyInfoById(person_id));
  };

  getAllCovidTestInfoByPersonId = (person_id: number) => {
    return this.queryService.query(GetAllCovidTestInfoByPersonId(person_id));
  };

  getAllBikeInfoByPersonId = (person_id: number) => {
    return this.queryService.query(GetAllPersonBikeInfoById(person_id));
  };

  getAllPersonNotificationInfoById = (person_id: number) => {
    return this.queryService.query(GetAllPersonNotificationInfoById(person_id));
  };

  getCovidTestingCentreInfoById = (covid_testing_centre_id: number) => {
    return this.queryService.query(
      GetCovidTestingCentreInfoById(covid_testing_centre_id)
    );
  };

  getScheduledClassDayInfo = (scheduled_class_id: string) => {
    return this.queryService.query(
      GetScheduledClassDayInfo(scheduled_class_id)
    );
  };

  getScheduledClassDayInfoByPersonId = (person_id: string) => {
    return this.queryService.query(
      GetScheduledClassDayInfoByPersonId(person_id)
    );
  };

  getAllCovidTestingCentreInfos = () => {
    return this.queryService.query(GetAllCovidTestingCentreInfos());
  };

  getPersonEntranceRoomBuildingTimeInfo = (jsonBody: any) => {
    const selections = getSelectionsFromJson(jsonBody);
    const projections = getProjectionsFromJson(jsonBody);
    return this.queryService.query(
      GetPersonEntranceRoomBuildingTime(selections, projections)
    );
  };

  getBubbleCountBySearchTerm = (searchTerm: string) => {
    return this.queryService.query(GetBubbleCountBySearchTerm(searchTerm));
  };

  getBubbleCountByPersonId = (personId: number) => {
    return this.queryService.query(GetBubbleCountByPersonId(personId));
  };

  getPersonsInBubblesBySearchTerm = (searchTerm: string) => {
    return this.queryService.query(GetPersonAllBubblesBySearchTerm(searchTerm));
  }

  getLargestScheduledClass = () => {
    return this.queryService.query(GetLargestScheduledClass());
  };

  getAllUnreadNotificationsByPersonId = (personId: number) => {
    return this.queryService.query(
      GetAllUnreadNotificationsByPersonId(personId)
    );
  };

  getFrequentlyUsedBuildings = () => {
    return this.queryService.query(GetFrequentlyUsedBuildings());
  };

  getPersonAllBubbles = () => {
    return this.queryService.query(GetPersonAllBubbles());
  };

  getPersonsUsedSameRoomAsPersonbyEntrance = (
    personId: number,
    startDate: string,
    endDate: string
  ) => {
    return this.queryService.query(
      GetPersonsUsedSameRoomAsAPersonByEntrance(personId, startDate, endDate)
    );
  };

  getPersonsUsedSameRoomAsPersonByClass = (
    personId: number,
    startDate: string,
    endDate: string
  ) => {
    return this.queryService.query(
      GetPersonsUsedSameRoomAsAPersonByClass(personId, startDate, endDate)
    );
  };

  getPersonsUsedSameBuildingsAsPerson = (
    personId: number,
    startDate: string,
    endDate: string
  ) => {
    return this.queryService.query(
      GetPersonsUsedBuildingsUsedByAPerson(personId, startDate, endDate)
    );
  };
}
