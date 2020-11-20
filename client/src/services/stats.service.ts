import {RemoteService} from "./remote.service";

class StatsService extends RemoteService {
  public async getLargestScheduledClasses(): Promise<any[]> {
    const response = await this.get("/largest_scheduled_class");
    return response.data;
  }

  public async getMostFrequentlyVisitedBuildings(): Promise<any[]> {
    const response = await this.get("/frequently_used_buildings");
    return response.data;
  }
}

export const statsService = new StatsService();
