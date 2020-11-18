import {RemoteService} from "./remote.service";
import {ClassDay} from "../model/class_day";
import {ScheduledClassConversions} from "../conversions/scheduled_class.conversions";

class ScheduledClassService extends RemoteService {
  public async getScheduledClassesByQueryString(queryString: string): Promise<ClassDay[]> {
    const response = await this.get(`/scheduled_class_info/${encodeURI(queryString)}`);
    return ScheduledClassConversions.toClassDays(response.data);
  }

  public async getScheduledClassesByPersonId(personId: number): Promise<ClassDay[]> {
    const response = await this.get(`/scheduled_class_info/person_id/${personId}`);
    return ScheduledClassConversions.toClassDays(response.data);
  }

  public async createPersonScheduledClass(personId: number, scheduledClassId: string): Promise<void> {
    await this.post("/person_scheduled_classes", {
      person_id: personId,
      scheduled_class_id: scheduledClassId
    });
  }

  public async deletePersonScheduledClass(personId: number, scheduledClassId: string): Promise<void> {
    await this.delete(`/person_scheduled_classes/${personId}/${encodeURI(scheduledClassId)}`);
  }
 }

 export const scheduledClassService = new ScheduledClassService();
