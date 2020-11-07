import QueryService from "../QueryService";
import {
  CreateBubble,
  GetAllBubbles,
  GetBubbleById,
  UpdateBubbleById,
} from "./bubble.queries";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { insertValues, setValues } from "../helpers/helpers";
import { BUBBLE_TABLE as B } from "../helpers/tables";

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
    const types = new ExpectedValueTypes([
      B.columns.description,
      B.columns.title,
    ]);
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateBubble(properties, values));
  };

  updateBubbleById = async (id: number, attributes: any) => {
    const types = new ExpectedValueTypes(
      [B.columns.description, B.columns.title],
      true
    );
    const set = setValues(attributes, types);
    await this.queryService.query(UpdateBubbleById(set, id));
    return this.getBubbleById(id);
  };
}
