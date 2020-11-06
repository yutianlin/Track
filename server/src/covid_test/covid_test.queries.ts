import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
} from "../helpers/queries";

import { COVID_TEST_TABLE } from "../helpers/tables";

const {
  tableName,
  columns
} = COVID_TEST_TABLE;

export const GetAllCovidTests = GetAllRowsFromTable(tableName);

export const CreateCovidTest = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const GetCovidTest = (pId: number, ctcId: number, time: Date) =>
  GetRowsWithSelection(
    tableName,
    `${columns.personId.getName()} = ${pId} AND
             ${columns.covid_testing_centre_id.getName()} = ${ctcId} AND 
             ${columns.test_time.getName()} = ${time}`
  );
