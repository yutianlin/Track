import QueryService from "../QueryService";
import {GetAllRelations, CreateRelation, GetRelationsByPersonId} from "./person_bike.queries";
import { insertValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { ParameterConstraintError } from "../errors";
import moment from "moment";
import { PERSON_TIME_BIKE_TABLE as PB } from "../helpers/tables";

export default class PersonBikeService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllRelations = async () => {
    return this.queryService.query(GetAllRelations());
  };

  getRelationsByPersonId = async (personId: number) => {
    return this.queryService.query(GetRelationsByPersonId(personId));
  }

  createRelation = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(PB.columns));
    attributes[PB.columns.rental_time.getName()] = moment().utc();
    const { properties, values } = insertValues(attributes, types);
    const sharedBikes: any[] = await this.queryService.query(
      CreateRelation(
        properties,
        values,
        attributes[PB.columns.bike_id.getName()]
      )
    );
    if (sharedBikes.length === 0)
      throw new ParameterConstraintError(
        PB.columns.bike_id.getName(),
        "bike must be rentable"
      );
    return sharedBikes;
  };
}
