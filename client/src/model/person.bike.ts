import {Moment} from "moment";

export interface PersonBike {
  shared_bike_id: string,
  person_id: number,
  rental_time: Moment
}