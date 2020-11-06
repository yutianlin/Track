import QueryService from "../QueryService";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { insertValues } from "../helpers/helpers";
import {
  CreateBubblePerson,
  GetAllBubblePersons,
} from "./bubble_person.queries";
import { BUBBLE_PERSON_TABLE as BP } from "../helpers/tables";

export default class BubblePerson {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllBubblePersons = async () => {
    return this.queryService.query(GetAllBubblePersons);
  };

  createBubblePerson = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(BP.columns));
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateBubblePerson(properties, values));
  };
}
