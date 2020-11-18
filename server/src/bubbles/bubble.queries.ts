import {
  DeleteRow,
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
} from "../helpers/queries";
import { BUBBLE_TABLE } from "../helpers/tables";

const { tableName, columns } = BUBBLE_TABLE;

export const GetAllBubbles = GetAllRowsFromTable(tableName);

export const GetBubbleById = (id: number) =>
  GetRowsWithSelection(tableName, `${columns.bubble_id.getName()} = ${id}`);

export const CreateBubble = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const UpdateBubbleById = (valuePairs: string, id: number) =>
  UpdateRow(tableName, valuePairs, `${columns.bubble_id.getName()} = ${id}`);

export const DeleteBubbleById = (id: number) =>
  DeleteRow(tableName, `${columns.bubble_id.getName()} = ${id}`);