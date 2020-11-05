import QueryService from "../QueryService";
import {
  CreateBubble,
  GetAllBubbles,
  GetBubbleById,
  UpdateBubbleById,
} from "./bubble.queries";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { insertValues, updateValues } from "../helpers/helpers";

const NULLABLESTRINGPROPERTIES = ["title", "description"];
const NOTNULLABLENUMBERPROPERTIES = ["bubble_id"];

export default class Bubble {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllBubbles = async () => {
    return this.queryService.query(GetAllBubbles);
  };

  getBubbleById = async (id: number) => {
    return this.queryService.query(GetBubbleById(id));
  };

  createBubble = async (attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNullableStrings(NULLABLESTRINGPROPERTIES);
    types.setNotNullableNumbers(NOTNULLABLENUMBERPROPERTIES);
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateBubble(properties, values));
  };

  updateBubbleById = async (id: number, attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNullableStrings(NULLABLESTRINGPROPERTIES);
    types.setNullableNumbers(NOTNULLABLENUMBERPROPERTIES);
    const set = updateValues(attributes, types);
    await this.queryService.query(UpdateBubbleById(set, id));
    return this.getBubbleById(id);
  };
}
