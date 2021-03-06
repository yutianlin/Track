import {RemoteService} from "./remote.service";

class PersonService extends RemoteService {
  public async getAllBikes(): Promise<any[]> {
    const response = await this.get(`/bikes`);
    return response.data;
  }
}

export const bikeService: PersonService = new PersonService();