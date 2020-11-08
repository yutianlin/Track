import QueryService from "../QueryService";
import { GetAllRelations, CreateRelation } from "./person_entrance.queries";
import { insertValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import moment from "moment";
import { PERSON_TIME_ENTRANCE_TABLE as PE } from "../helpers/tables";

export default class PersonDateEntranceService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllRelations = async () => {
    return this.queryService.query(GetAllRelations());
  };

  createRelation = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(PE.columns));
    attributes[PE.columns.date.getName()] = moment().utc();
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateRelation(properties, values));
  };
}
