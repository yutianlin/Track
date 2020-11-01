import QueryService from "../QueryService";
import {
  GetAllRelations,
  CreateRelation,
} from "./person_bike.queries";
import { insertValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import moment from "moment";

const NOTNULLABLENUMBERPROPERTIES = ["person_id"];
const NOTNULLABLEDATETIMEPROPERTIES = ["rental_time"];
const NOTNULLABLESTRINGPROPERTIES = ["shared_bike_id"];

export default class PersonBikeService {
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
    types.setNotNullableStrings(NOTNULLABLESTRINGPROPERTIES);
    attributes["rental_time"] = moment().utc().toISOString();
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateRelation(properties, values));
  };
}
