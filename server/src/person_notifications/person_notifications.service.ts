import moment from "moment";
import QueryService from "../QueryService";
import { GetAllRelations, CreateRelation, MarkNotificationAsRead } from "./person_notification.queries";
import { UTCify, stringify } from "../helpers/helpers";

export default class PersonNotificationService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllRelations = async () => {
    return this.queryService.query(GetAllRelations());
  };

  createRelation = async (personId: number, notificationId: number) => {
    const now = moment().utc().toString();
    return this.queryService.query(
      CreateRelation(personId, notificationId, UTCify(stringify(now)))
    );
  };
  markNotificationAsRead = async (notification_id: string, person_id: string) => {
    return this.queryService.query(MarkNotificationAsRead(person_id, notification_id));
  }
}
