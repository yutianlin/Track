import QueryService from "../QueryService";

import {
  GetAllCovidTestInfoByPersonId,
  GetAllCovidTestingCentreInfos,
  GetAllPersonBikeInfoById,
  GetAllPersonNotificationInfoById,
  GetAllUnreadNotificationsByPersonId,
  GetBubbleCountBySearchTerm,
  GetCovidTestingCentreInfoById,
  GetEntranceInfoById,
  GetFrequentlyUsedBuilding,
  GetLargestScheduledClass, GetPersonAllBubbles,
  GetPersonAndFacultyInfoById,
  GetPersonEntranceRoomBuildingTime,
  GetScheduledClassDayInfo,
  GetScheduledClassDayInfoByPersonId
} from "./join.queries";
import {
  getProjectionsFromJson,
  getSelectionsFromJson,
} from "../helpers/helpers";

export default class Join {
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
    return this.queryService.query(GetScheduledClassDayInfoByPersonId(person_id));
  }

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

  getLargestScheduledClass = () => {
    return this.queryService.query(GetLargestScheduledClass());
  };

  getAllUnreadNotificationsByPersonId = (personId: number) => {
    return this.queryService.query(
      GetAllUnreadNotificationsByPersonId(personId)
    );
  };

  getFrequentlyUsedBuildings = () => {
    return this.queryService.query(GetFrequentlyUsedBuilding());
  };

  getPersonAllBubbles = () => {
    return this.queryService.query(GetPersonAllBubbles());
  }
}
