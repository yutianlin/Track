export const GetAllRowsFromTable = (tableName: string) =>
  `SELECT * FROM ${tableName};`;

export const GetRowsWithSelection = (tableName: string, selection: string) =>
  `SELECT * FROM ${tableName} WHERE ${selection};`;

export const GetRowsWithProjection = (tableName: string, projection: string) =>
  `SELECT ${projection} FROM ${tableName};`;

export const GetRowsWithProjectionSelection = (
  tableName: string,
  projection: string,
  selection: string
) => `SELECT ${projection} FROM ${tableName} WHERE ${selection};`;

export const InsertRow = (
  tableName: string,
  properties: string,
  values: string
) => `INSERT INTO ${tableName} ${properties} VALUES ${values} RETURNING *;`;

export const UpdateRow = (
  tableName: string,
  valuePairs: string,
  selection: string
) => `UPDATE ${tableName} SET ${valuePairs} WHERE ${selection};`;
