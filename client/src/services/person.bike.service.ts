import {RemoteService} from "./remote.service";
import {BikeConversions} from "../conversions/bike.conversions";
import {PersonBike} from "../model/person.bike";
import {toRequestJson} from "../conversions/conversions.util";

class PersonBikeService extends RemoteService {
  public async getBikeRentalsByPersonId(personId: number): Promise<PersonBike[]> {
    const response = await this.get(`/person_bikes/${personId}`);
    return BikeConversions.toPersonBikes(response.data);
  }

  public async createPersonBike(personId: number, bikeId: string): Promise<PersonBike> {
    const response = await this.post("/person_bikes", toRequestJson({
      person_id: personId,
      shared_bike_id: bikeId
    }));
    return BikeConversions.toPersonBike(response.data[0]);
  }
}

export const personBikeService: PersonBikeService = new PersonBikeService();