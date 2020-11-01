import QueryService from "../QueryService";
import {
  GetAllRelations,
  CreateRelation,
} from "./person_entrance.queries";
import { insertValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import moment from "moment";

const NOTNULLABLENUMBERPROPERTIES = ["person_id", "entrance_id"];
const NOTNULLABLEDATETIMEPROPERTIES = ["start_time"];

export default class PersonDateEntranceService {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllRelations = async () => {
    return this.queryService.query(GetAllRelations());
  };

  createRelation = async (attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNotNullableNumbers(NOTNULLABLENUMBERPROPERTIES);
    types.setNotNullableDateTimes(NOTNULLABLEDATETIMEPROPERTIES);
    attributes["start_time"] = moment().utc().toISOString();
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateRelation(properties, values));
  };
}
