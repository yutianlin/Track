import { DeleteRow, GetAllRowsFromTable, InsertRow } from "../helpers/queries";
import { BUBBLE_PERSON_TABLE } from "../helpers/tables";

const { tableName, columns } = BUBBLE_PERSON_TABLE;

export const GetAllBubblePersons = GetAllRowsFromTable(tableName);

export const CreateBubblePerson = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const DeleteBubblePerson = (personId: number, bubbleId: number) =>
  DeleteRow(
    tableName,
    `${columns.person_id.getName()} = ${personId} AND ${columns.bubble_id.getName()} = ${bubbleId}`
  );
