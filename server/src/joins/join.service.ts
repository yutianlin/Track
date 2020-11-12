import QueryService from "../QueryService";

import {
  GetAllCovidTestInfoByPersonId,
  GetAllPersonBikeInfoById,
  GetAllPersonNotificationInfoById, GetCovidTestingCentreInfoById,
  GetEntranceInfoById,
  GetPersonAndFacultyInfoById,
  GetScheduledClassDayInfo
} from "./join.queries";

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
  }

  getAllPersonNotificationInfoById = (person_id: number) => {
    return this.queryService.query(GetAllPersonNotificationInfoById(person_id));
  }

  getCovidTestingCentreInfoById = (covid_testing_centre_id: number) => {
    return this.queryService.query(GetCovidTestingCentreInfoById(covid_testing_centre_id));
  }

  getScheduledClassDayInfo = (dept: string, code: string, section: string, term: string, year: number) => {
    return this.queryService.query(GetScheduledClassDayInfo(dept, code, section, term, year));
  }

}
