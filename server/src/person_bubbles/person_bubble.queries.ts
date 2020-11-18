import {
  DeleteRow,
  GetAllRowsFromTable,
  InsertRow,
  GetRowsWithProjectionSelection,
} from "../helpers/queries";
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

export const GetAllPersonIdsInBubbleWithPerson = (personId: number) => {
  const getAllContaminatedBubbleIds = GetRowsWithProjectionSelection(
    `bp2.${columns.bubble_id.getName()}`,
    `${tableName} bp2`,
    `bp2.${columns.person_id.getName()} = ${personId}`
  );
  const getAllPersonsFromBubbleIds = GetRowsWithProjectionSelection(
    `DISTINCT(bp1.${columns.person_id.getName()})`,
    `${tableName} bp1`,
    `bp1.${columns.bubble_id.getName()} IN (${getAllContaminatedBubbleIds})`
  );

  return getAllPersonsFromBubbleIds;
};
