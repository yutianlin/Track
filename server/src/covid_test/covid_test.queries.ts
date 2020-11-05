import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
} from "../helpers/queries";

import { COVID_TEST_TABLE } from "../helpers/tables";

const {
  tableName,
  personId,
  covidTestingCentreId,
  testTime,
} = COVID_TEST_TABLE;

export const GetAllCovidTests = GetAllRowsFromTable(tableName);

export const CreateCovidTest = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const GetCovidTest = (pId: number, ctcId: number, time: Date) =>
  GetRowsWithSelection(
    tableName,
    `${personId} = ${pId} AND
             ${covidTestingCentreId} = ${ctcId} AND 
             ${testTime} = ${time}`
  );
