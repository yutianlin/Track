import {
  GetAllRowsFromTable, GetRowsWithSelectionWithOrderBy,
  InsertRowWithSelectCondition,
} from "../helpers/queries";
import { stringify } from "../helpers/helpers";
import {
  PERSON_TIME_BIKE_TABLE as PB,
  BIKE_TABLE as B
} from "../helpers/tables";

export const GetAllRelations = () => GetAllRowsFromTable(PB.tableName);

export const GetRelationsByPersonId = (personId: number) =>
  GetRowsWithSelectionWithOrderBy(
    PB.tableName,
    `${PB.columns.person_id.getName()} = ${personId}`,
    `ORDER BY ${PB.columns.rental_time.getName()} DESC`);

export const CreateRelation = (
  properties: string,
  values: string,
  bikeId: string
) => {
  const query = InsertRowWithSelectCondition(
    PB.tableName,
    properties,
    values,
    B.tableName,
    `${B.columns.shared_bike_id.getName()} = ${stringify(
      bikeId
    )} AND is_rentable = true`,
    true
  );

  console.log(query);
  return query;
}

