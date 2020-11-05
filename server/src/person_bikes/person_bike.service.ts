import QueryService from "../QueryService";
import { GetAllRelations, CreateRelation } from "./person_bike.queries";
import { insertValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { ParameterConstraintError } from "../errors";
import moment from "moment";
import { PERSON_TIME_BIKE_TABLE as PB } from "../helpers/tables";

export default class PersonBikeService {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllRelations = async () => {
    return this.queryService.query(GetAllRelations());
  };

  createRelation = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(PB.columns));
    attributes[PB.columns.rentalTime.getName()] = moment().utc().toISOString();
    const { properties, values } = insertValues(attributes, types);
    const sharedBikes: any[] = await this.queryService.query(
      CreateRelation(
        properties,
        values,
        attributes[PB.columns.bikeId.getName()]
      )
    );
    if (sharedBikes.length === 0)
      throw new ParameterConstraintError(
        PB.columns.bikeId.getName(),
        "bike must be rentable"
      );
    return sharedBikes;
  };
}
