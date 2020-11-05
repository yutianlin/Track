import {
  GetAllRowsFromTable,
  InsertRowWithSelectCondition,
} from "../helpers/queries";
import { stringify } from "../helpers/helpers";
import {
  PERSON_TIME_BIKE_TABLE as PB,
  BIKE_TABLE as B,
} from "../helpers/tables";

export const GetAllRelations = () => GetAllRowsFromTable(PB.tableName);

export const CreateRelation = (
  properties: string,
  values: string,
  bikeId: string
) =>
  InsertRowWithSelectCondition(
    PB.tableName,
    properties,
    values,
    B.tableName,
    `${B.columns.id.getName()} = ${stringify(bikeId)} AND is_rentable = true`,
    true
  );
