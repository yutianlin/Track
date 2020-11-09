export const GetAllRowsFromTable = (tableName: string) =>
  `SELECT * FROM ${tableName};`;

export const GetRowsWithSelection = (tableName: string, selection: string) =>
  `SELECT * FROM ${tableName} WHERE ${selection};`;

export const GetRowsWithProjection = (tableName: string, projection: string) =>
  `SELECT ${projection} FROM ${tableName};`;

export const GetRowsWithProjectionSelection = (
  projection: string,
  tableName: string,
  selection: string
) => `SELECT ${projection} FROM ${tableName} WHERE ${selection};`;

export const InsertRow = (
  tableName: string,
  properties: string,
  values: string
) => `INSERT INTO ${tableName} (${properties}) VALUES (${values}) RETURNING *;`;

export const UpdateRow = (
  tableName: string,
  valuePairs: string,
  selection: string
) => `UPDATE ${tableName} SET ${valuePairs} WHERE ${selection} RETURNING *;`;

export const DeleteRow = (tableName: string, selection: string) =>
  `DELETE FROM ${tableName} WHERE ${selection} RETURNING *;`;

export const InsertRowWithSelectCondition = (
  insertTableName: string,
  projection: string,
  values: string,
  selectTableName: string,
  selection: string,
  selectionMet: boolean
) =>
  `INSERT INTO ${insertTableName} (${projection})
    SELECT ${values} WHERE ${selectionMet ? "" : "NOT "}EXISTS (
      SELECT 1 FROM ${selectTableName} WHERE ${selection}
    ) RETURNING *;`;
