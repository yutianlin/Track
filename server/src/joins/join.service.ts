import QueryService from "../QueryService";

import { GetEntranceInfoById } from "./join.queries";

export default class Join {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getEntranceInfoById = (id: number) => {
    return this.queryService.query(GetEntranceInfoById(id));
  };
}
