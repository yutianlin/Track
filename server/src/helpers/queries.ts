export const UnionQueries = (query1: string, query2: string) =>
  `(${query1}) 
  UNION 
  (${query2})`;

export const GetAllRowsFromTable = (tableName: string) =>
  `SELECT * FROM ${tableName}`;

export const GetRowsWithSelection = (tableName: string, selection: string) =>
  `SELECT * FROM ${tableName} WHERE ${selection};`;

export const GetRowsWithSelectionWithOrderBy = (tableName: string, selection: string, orderBy: string) =>
  `SELECT * FROM ${tableName} WHERE ${selection} ${orderBy};`;

export const GetRowsWithProjection = (tableName: string, projection: string) =>
  `SELECT ${projection} FROM ${tableName}`;

export const GetRowsWithProjectionSelection = (
  projection: string,
  tableName: string,
  selection: string
) => `SELECT ${projection}
  FROM ${tableName}
  WHERE ${selection}`;

export const GetRowsWithProjectionSelectionGroupBy = (
    projection: string,
    tableName: string,
    selection: string,
    group: string
) => `SELECT ${projection} FROM ${tableName} WHERE ${selection} GROUP BY ${group};`;

export const GetRowsWithProjectionGroupBy = (
    projection: string,
    tableName: string,
    group: string
) => `SELECT ${projection} FROM ${tableName} GROUP BY ${group};`;

export const GetRowsWithProjectionSelectionGroupByHaving = (
    projection: string,
    tableName: string,
    selection: string,
    group: string,
    having: string
) => `SELECT ${projection} FROM ${tableName} WHERE ${selection} GROUP BY ${group} HAVING ${having};`;

export const GetRowsWithProjectionGroupByHaving = (
    projection: string,
    tableName: string,
    group: string,
    having: string
) => `SELECT ${projection} FROM ${tableName} GROUP BY ${group} HAVING ${having};`;

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
