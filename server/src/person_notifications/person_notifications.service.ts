import moment from "moment";
import QueryService from "../QueryService";
import { GetAllRelations, CreateRelation } from "./person_notification.queries";
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
}
