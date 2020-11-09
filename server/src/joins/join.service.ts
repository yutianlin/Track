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

  getEntranceInfoById = (id: number) => {
    return this.queryService.query(GetEntranceInfoById(id));
  };

  getPersonAndFacultyInfoById = (id: number) => {
    return this.queryService.query(GetPersonAndFacultyInfoById(id));
  };

  getAllCovidTestInfoByPersonId = (id: number) => {
    return this.queryService.query(GetAllCovidTestInfoByPersonId(id));
  };

  getAllBikeInfoByPersonId = (id: number) => {
    return this.queryService.query(GetAllPersonBikeInfoById(id));
  }

  getAllPersonNotificationInfoById = (id: number) => {
    return this.queryService.query(GetAllPersonNotificationInfoById(id));
  }

  getCovidTestingCentreInfoById = (id: number) => {
    return this.queryService.query(GetCovidTestingCentreInfoById(id));
  }

  getScheduledClassDayInfo = (dept: string, code: string, section: string, term: string, year: number) => {
    return this.queryService.query(GetScheduledClassDayInfo(dept, code, section, term, year));
  }

}
