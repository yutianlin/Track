import {RemoteService} from "./remote.service";
import {BubbleInfo} from "../model/bubble_info";
import {Bubble} from "../model/bubble";

class BubbleService extends RemoteService {
  public async getBubbleInfosBySearchTerm(searchTerm: string): Promise<BubbleInfo[]> {
    const response = await this.get(`/bubble_count_by_term/${encodeURI(searchTerm)}`);
    return response.data;
  }

  public async getBubbleInfosByPersonId(personId: number): Promise<BubbleInfo[]> {
    const response = await this.get(`/bubble_count_by_id/${personId}`);
    return response.data;
  }

  public async createPersonBubble(personId: number, bubbleId: string | number): Promise<void> {
    await this.post("/person_bubbles", {
      person_id: personId,
      bubble_id: bubbleId
    });
  }

  public async deletePersonBubble(personId: number, bubbleId: string): Promise<void> {
    await this.delete(`/person_bubbles/person_id/${personId}/bubble_id/${bubbleId}`);
  }

  public async createBubble(bubble: any): Promise<Bubble> {
    const response = await this.post("/bubbles", bubble);
    return response.data[0];
  }
}

export const bubbleService = new BubbleService();
