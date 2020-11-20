import {
  GetAllRowsFromTable,
  InsertRow,
  DeleteRow,
  GetRowsWithProjectionSelection,
  GetRowsWithSelection,
} from "../helpers/queries";

import { PERSON_SCHEDULED_CLASS_TABLE } from "../helpers/tables";

const { tableName, columns } = PERSON_SCHEDULED_CLASS_TABLE;

export const GetAllRelations = () => GetAllRowsFromTable(tableName);

export const CreateRelation = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const DeleteRelation = (selection: string) =>
  DeleteRow(tableName, selection);

export const GetPersonsInSameClass = (personId: number) => {
  const classes = GetRowsWithProjectionSelection(
    `p2.${columns.scheduled_class_id.getName()}`,
    `${tableName} p2`,
    `p2.${columns.person_id.getName()} = ${personId}`
  );

  return GetRowsWithSelection(
    `${tableName} p1`,
    `${columns.scheduled_class_id.getName()} IN (${classes})`
  );
};
