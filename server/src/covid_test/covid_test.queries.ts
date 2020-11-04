import {GetAllRowsFromTable, GetRowsWithSelection, InsertRow} from "../helpers/queries";
import { stringify } from "../helpers/helpers";

import {COVID_TEST_TABLE} from "../helpers/tables";

const { tableName, personId, covidTestingCentreId, testTime} = COVID_TEST_TABLE;

export const GetAllCovidTests = GetAllRowsFromTable(tableName);

export const CreateCovidTest = (properties: string, values: string) =>
    InsertRow(tableName, properties, values);

export const GetCovidTest = (pId: string, ctcId: string, time: Date) =>
    GetRowsWithSelection(tableName,
        `${personId} = ${stringify(pId)} AND ${covidTestingCentreId} = ${stringify(ctcId)} AND ${testTime} = ${time}`);
