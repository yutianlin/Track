import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
} from "../helpers/queries";
import { BUBBLE_TABLE } from "../helpers/tables";

const { tableName, bubbleId } = BUBBLE_TABLE;

export const GetAllBubbles = GetAllRowsFromTable(tableName);

export const GetBubbleById = (id: number) =>
  GetRowsWithSelection(tableName, `${bubbleId} = ${id}`);

export const CreateBubble = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const UpdateBubbleById = (valuePairs: string, id: number) =>
  UpdateRow(tableName, valuePairs, `${bubbleId} = ${id}`);
