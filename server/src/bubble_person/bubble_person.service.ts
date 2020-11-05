import QueryService from "../QueryService";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { insertValues } from "../helpers/helpers";
import {
  CreateBubblePerson,
  GetAllBubblePersons,
} from "./bubble_person.queries";

const NOTNULLABLENUMBERPROPERTIES = ["bubble_id", "person_id"];

export default class BubblePerson {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllBubblePersons = async () => {
    return this.queryService.query(GetAllBubblePersons);
  };

  createBubblePerson = async (attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNotNullableNumbers(NOTNULLABLENUMBERPROPERTIES);
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateBubblePerson(properties, values));
  };
}