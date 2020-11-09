import moment from 'moment-timezone';
import {PersonBike} from "../model/person.bike";

export class BikeConversions {
  private static TIMEZONE: string = moment.tz.guess();

  public static toPersonBikes(responses: any[]): PersonBike[] {
    return responses.map(BikeConversions.toPersonBike);
  }

  public static toPersonBike(response: any): PersonBike {
    return {
      shared_bike_id: response.shared_bike_id,
      person_id: response.person_id,
      rental_time: moment(response.rental_time).tz(BikeConversions.TIMEZONE)
    };
  }
}