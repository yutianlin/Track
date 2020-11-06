import { GetAllRowsFromTable, InsertRow } from "../helpers/queries";
import { BUBBLE_PERSON_TABLE } from "../helpers/tables";

const { tableName } = BUBBLE_PERSON_TABLE;

export const GetAllBubblePersons = GetAllRowsFromTable(tableName);

export const CreateBubblePerson = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);
