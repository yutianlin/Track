import {RemoteService} from "./remote.service";
import {EntranceInfo} from "../model/entrance_info";

class EntranceService extends RemoteService {
  public async getEntranceInfoById(id: string): Promise<EntranceInfo | undefined> {
    const response = await this.get(`/entrance_info/${id}`);
    if (response.data.length === 0) {
      return undefined;
    } else {
      return response.data[0];
    }
  }

  public async createPersonEntrance(personId: number, entranceId: number): Promise<void> {
    await this.post("/person_entrances", {
      person_id: personId,
      entrance_id: entranceId
    });
  }
}

export const entranceService = new EntranceService();
