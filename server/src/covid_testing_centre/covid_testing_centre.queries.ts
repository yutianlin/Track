import { GetAllRowsFromTable, GetRowsWithSelection } from "../helpers/queries";

import { COVID_TESTING_CENTRE_TABLE } from "../helpers/tables";

const { tableName, id } = COVID_TESTING_CENTRE_TABLE;

export const GetAllCovidTestingCentres = GetAllRowsFromTable(tableName);

export const GetCovidTestingCentreById = (ctcId: number) =>
  GetRowsWithSelection(tableName, `${id} = ${ctcId}`);
