import {
  GetAllRowsFromTable,
  InsertRow,
} from "../helpers/queries";

import { PERSON_TIME_ENTRANCE_TABLE } from "../helpers/tables";

const {tableName} = PERSON_TIME_ENTRANCE_TABLE

export const GetAllRelations = () =>
  GetAllRowsFromTable(tableName);

export const CreateRelation = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);
