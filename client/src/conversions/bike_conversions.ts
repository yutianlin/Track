import {PersonBike} from "../model/person.bike";
import {toMoment} from "./conversions.util";

export class BikeConversions {
  public static toPersonBikes(responses: any[]): PersonBike[] {
    return responses.map(BikeConversions.toPersonBike);
  }

  public static toPersonBike(response: any): PersonBike {
    return {
      shared_bike_id: response.shared_bike_id,
      person_id: response.person_id,
      rental_time: toMoment(response.rental_time)
    };
  }
}