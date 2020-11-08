import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
} from "../helpers/queries";
import { UTCify, stringify } from "../helpers/helpers";

import { COVID_TEST_TABLE } from "../helpers/tables";

const { tableName, columns } = COVID_TEST_TABLE;

export const GetAllCovidTests = GetAllRowsFromTable(tableName);

export const CreateCovidTest = (properties: string, values: string) =>
  InsertRow(tableName, properties, values);

export const UpdateCovidTestByPK = (
  personId: number,
  testingCentreId: number,
  testInputTime: string,
  values: string
) =>
  UpdateRow(
    tableName,
    values,
    `${columns.person_id.getName()} = ${personId} AND
  ${columns.covid_testing_centre_id.getName()} = ${testingCentreId} AND
  ${columns.test_input_time.getName()} = ${UTCify(stringify(testInputTime))}`
  );
