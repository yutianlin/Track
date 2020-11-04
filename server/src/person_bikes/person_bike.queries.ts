import {
  GetAllRowsFromTable,
  InsertRow,
  InsertRowWithSelectCondition,
} from "../helpers/queries";
import { stringify } from "../helpers/helpers";
import { PERSON_BIKE_TABLE as PB, BIKE_TABLE as B } from "../helpers/tables";

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
    `${B.id} = ${stringify(bikeId)} AND is_rentable = true`,
    true
  );
