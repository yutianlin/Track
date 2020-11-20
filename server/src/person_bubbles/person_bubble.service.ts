import QueryService from "../QueryService";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { insertValues } from "../helpers/helpers";
import {
  CreateBubblePerson,
  GetAllBubblePersons,
  DeleteBubblePerson,
  GetAllPersonIdsInBubbleWithPerson,
} from "./person_bubble.queries";
import { BUBBLE_PERSON_TABLE as BP } from "../helpers/tables";

export default class BubblePersonService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllPersonBubbles = async () => {
    return this.queryService.query(GetAllBubblePersons);
  };

  createPersonBubble = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(BP.columns));
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateBubblePerson(properties, values));
  };

  deletePersonBubble = async (personId: number, bubbleId: number) => {
    return this.queryService.query(DeleteBubblePerson(personId, bubbleId));
  };

  getAllPersonIdsInBubbleWithPerson = async (personId: number) => {
    return this.queryService.query(GetAllPersonIdsInBubbleWithPerson(personId));
  };
}
