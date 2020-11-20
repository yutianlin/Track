import QueryService from "../QueryService";
import {
  GetAllPersons,
  GetPersonById,
  CreatePerson,
  UpdatePersonById,
  UpdatePersonsByIdStatusToYellow,
  GetPersonStatusById,
} from "./person.queries";
import {
  insertValues,
  setValues,
  getPropertiesAndValues,
  listify,
  stringify
} from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { PERSON_TABLE, NOTIFICATION_TABLE, BUBBLE_PERSON_TABLE } from "../helpers/tables";
import moment from "moment";
import BubblePersonService from "../person_bubbles/person_bubble.service";
import JoinService from "../joins/join.service";
import PersonScheduledClassesService from "../person_scheduled_classes/person_scheduled_classes.service";
import NotificationService from "../notifications/notification.service";
import PersonNotificationService from "../person_notifications/person_notifications.service";

const { tableName, columns } = PERSON_TABLE;
const expectValues = [
  columns.email,
  columns.faculty_id,
  columns.in_app_notification,
  columns.name,
  columns.phone_number,
  columns.student_id,
  columns.person_status,
];

export default class PersonService {
  private queryService: QueryService;
  private personBubbleService: BubblePersonService;
  private joinService: JoinService;
  private personScheduledClassesService: PersonScheduledClassesService;
  private notificationService: NotificationService;
  private personNotificationService: PersonNotificationService;

  constructor() {
    this.queryService = new QueryService();
    this.personBubbleService = new BubblePersonService();
    this.joinService = new JoinService();
    this.personScheduledClassesService = new PersonScheduledClassesService();
    this.notificationService = new NotificationService();
    this.personNotificationService = new PersonNotificationService();
  }

  getAllPersons = async () => {
    return this.queryService.query(GetAllPersons);
  };

  getPersonById = async (id: number) => {
    return this.queryService.query(GetPersonById(id));
  };

  getPersonStatusById = async (id: number) => {
    return this.queryService.query(GetPersonStatusById(id));
  };

  createPerson = async (attributes: any) => {
    const types = new ExpectedValueTypes(expectValues);
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreatePerson(properties, values));
  };

  updatePersonById = async (id: number, attributes: any) => {
    const types = new ExpectedValueTypes(expectValues, true);
    console.log(JSON.stringify(types));

    const status = getPropertiesAndValues(
      attributes,
      new ExpectedValueTypes([columns.person_status])
    ).values;

    if (
      attributes.hasOwnProperty(columns.person_status.getName()) &&
      attributes[columns.person_status.getName()] === "R"
    ) {
      delete attributes[columns.person_status.getName()];
    }

    const set = setValues(attributes, types);
    console.log(JSON.stringify(set));

    if (set !== "") {
      await this.queryService.query(UpdatePersonById(set, id));
    }

    if (status.length === 1 && status[0] === `'R'`) {
      await this.updatePersonStatusToPositive(id);
    }
    return this.getPersonById(id);
  };

  updatePersonStatusToPositive = async (id: number, startTime?: string) => {
    // if already infected, do nothing
    const person = await this.getPersonById(id);
    if (
      person.length === 0 ||
      person[0][columns.person_status.getName()] === "R"
    ) {
      return;
    }

    await this.queryService.query(
      UpdatePersonById(`${columns.person_status.getName()} = 'R'`, id)
    );
    await this.triggerWhenStatusSetToRed(id);
  };

  triggerWhenStatusSetToRed = async (personId: number, startTime?: string) => {
    const dateNow = moment().utc();
    const dateNowUnquote = `${dateNow.format("YYYY-MM-DD")}Z`
    const startTimeUnquote = startTime ?? `${dateNow
      .subtract(2, "weeks")
      .format("YYYY-MM-DD")}Z`
    const dateNowFormatted = stringify(dateNowUnquote);
    const startTimeFormatted = stringify(startTimeUnquote);

    const personIdsFromBubble: {
      person_id: any,
      bubble_id: any,
      title: any
    }[] = await this.personBubbleService.getAllPersonIdsInBubbleWithPerson(
      personId
    );
    console.log(personIdsFromBubble);

    const personIdsFromEntrance: {
      person_id: any,
      room_number: any,
      building_code: any,
      start_time: any,
    }[] = await this.joinService.getPersonsUsedSameRoomAsPersonbyEntrance(
      personId,
      startTimeFormatted,
      dateNowFormatted
    );
    console.log(personIdsFromEntrance);

    const personIdsFromClass: {
      person_id: any,
      scheduled_class_id: any,
      building_code: any,
      room_number: any,
    }[] = await this.joinService.getPersonsUsedSameRoomAsPersonByClass(
      personId,
      startTimeFormatted,
      dateNowFormatted
    );
    console.log(personIdsFromClass);

    const personIdsFromBuilding: {
      person_id: any,
      building_code: any
    }[] = await this.joinService.getPersonsUsedSameBuildingsAsPerson(
      personId,
      startTimeFormatted,
      dateNowFormatted
    );
    console.log(personIdsFromBuilding);

    const personIdsPossiblyInfected = Array.from(new Set([
      ...personIdsFromBubble,
      ...personIdsFromEntrance,
      ...personIdsFromClass,
    ].map((pId) => pId.person_id)));


    const personIdsPossiblyInfectedString = listify(personIdsPossiblyInfected);

    await this.queryService.query(
      UpdatePersonsByIdStatusToYellow(personIdsPossiblyInfectedString)
    );

    const personIdsFromSchedule: {
      person_id: any,
      scheduled_class_id: any,
    }[] = await this.personScheduledClassesService.getPersonsInSameClass(
      personId
    );
    console.log(personIdsFromSchedule);

    await this.createMessagesForRelatedPersons(startTimeUnquote, dateNowUnquote, personId, personIdsPossiblyInfected, personIdsFromBubble, personIdsFromSchedule, personIdsFromEntrance, personIdsFromClass, personIdsFromBuilding)
  };

  createMessagesForRelatedPersons = async (
    startTime: string,
    timeNow: string,
    personId: number, 
    allIdsPossiblyInfected: number[], 
    bubblePersons: {person_id: any, bubble_id: any, title: any}[],
    scheduledClassPersons: {person_id: any, scheduled_class_id: any}[],
    entranceRoomPersons: {person_id: any, room_number: any, building_code: any, start_time: any}[],
    classRoomPersons: {person_id: any, room_number: any, building_code: any, scheduled_class_id: any}[],
    buildingPersons: {person_id: any, building_code: any}[],
    ) => {
    const person: {person_id: any, name: any, email: any, phone_number: any, student_id: any, faculty_id: any} = (await this.getPersonById(personId))[0];
    console.log(person);
    const personMessagesBundle: string[] = [];
    const tempMessage: string[][] = [];

    let personRole = "";
    if (person.faculty_id && person.student_id) {
      personRole = `faculty member (${person.faculty_id}) and a student (${person.student_id})`;
    } else if (person.faculty_id) {
      personRole = `faculty member (${person.faculty_id})`;
    } else if (person.student_id) {
      personRole = `student (${person.student_id})`;
    } else {
      personRole = `visitor`;
    }

    const subject = `TRACK Notification: ${person.name} is Infected with COVID-19`;
    const beginMessage = `${person.name} who is a ${personRole} is confirmed with COVID-19 on ${timeNow}, and may have been contagious since ${startTime}.
    You should go into self isolation since you have been in contact with ${person.name} in this contagious time period by:`
    
    allIdsPossiblyInfected.forEach(pi => {
      personMessagesBundle[pi] = beginMessage;
    });
    console.log(bubblePersons);

    // deals with bubbles
    const uniqueBubblePersonIds = new Set(bubblePersons.map(bp => bp.person_id));
    uniqueBubblePersonIds.forEach(ubpi => tempMessage[ubpi] = []);
    bubblePersons.forEach(bp => tempMessage[bp.person_id].push(bp.title));
    uniqueBubblePersonIds.forEach(ubpi => personMessagesBundle[ubpi] = `${personMessagesBundle[ubpi]} 
    Being in the same bubble (${listify(tempMessage[ubpi])})`);

    // deals with rooms by entrance
    const uniqueEntrancePersonIds = new Set(entranceRoomPersons.map((erp) => erp.person_id));
    uniqueEntrancePersonIds.forEach((uepi) => (tempMessage[uepi] = []));
    entranceRoomPersons.forEach(erp => tempMessage[erp.person_id].push(`${erp.building_code} ${erp.room_number} at ${moment(erp.start_time).utc().toISOString()}`));
    uniqueEntrancePersonIds.forEach(uepi => personMessagesBundle[uepi] = `${personMessagesBundle[uepi]} 
    Being in the same room in the same day (${listify(tempMessage[uepi])})`);

    // deals with rooms by classrooms
    const uniqueClassRoomPersonIds = new Set(classRoomPersons.map(crp => crp.person_id));
    uniqueClassRoomPersonIds.forEach(ucrpi => tempMessage[ucrpi] = []);
    classRoomPersons.forEach(crp => tempMessage[crp.person_id].push(`${crp.scheduled_class_id} in ${crp.building_code} ${crp.room_number}`));
    uniqueClassRoomPersonIds.forEach(ucrpi => personMessagesBundle[ucrpi] = `${personMessagesBundle[ucrpi]} 
    Having a class in a room visited by ${person.name} on the same day (${listify(tempMessage[ucrpi])})`);

    // deals with scheduled class
    const uniqueScheduledClassPersonIds = new Set(scheduledClassPersons.map(scp => scp.person_id));
    uniqueScheduledClassPersonIds.forEach(uscpi => tempMessage[uscpi] = []);
    scheduledClassPersons.forEach(scp => tempMessage[scp.person_id].push(scp.scheduled_class_id));
    uniqueScheduledClassPersonIds.forEach(uscpi => personMessagesBundle[uscpi] = `${personMessagesBundle[uscpi]} 
    Also note that you are in the same class(es) (${listify(tempMessage[uscpi])})`);

    // deals with additional buildings
    buildingPersons = buildingPersons.filter(bp => !(allIdsPossiblyInfected.includes(bp.person_id)));
    const uniqueBuildingPersonIds = new Set(buildingPersons.map(bp => bp.person_id));
    uniqueBuildingPersonIds.forEach(ubpi => tempMessage[ubpi] = []);
    buildingPersons.forEach(bp => tempMessage.push(bp.building_code));
    uniqueBuildingPersonIds.forEach(ubpi => personMessagesBundle[ubpi] = `${person.name} who is a ${personRole} is confirmed with COVID-19 on ${timeNow} and may have been contagious since ${startTime}. 
    You have not shared any rooms, bubbles or classes, but these are the shared buildings between the two of you in the period that they are contagious: ${listify(tempMessage[ubpi])}`);

    // Sends all messages
    const sentPromises: Promise<any>[] = [];
    ([...allIdsPossiblyInfected, ...Array.from(uniqueBuildingPersonIds)]).forEach(id => sentPromises.push(this.sendMessageToPerson(id, personMessagesBundle[id], subject)));
    return Promise.all(sentPromises).then(() => {
      console.log('all messages sent');
      return;
    }).catch((e) => {
      console.log(e);
      return;
    })
  }

  private sendMessageToPerson = async (personId: number, message: string, subject: string) => {
    const person: {person_id: any, name: any, email: any, phone_number: any, student_id: any, faculty_id: any} = (await this.getPersonById(personId))[0];
    const sentPromises: Promise<any>[] = [];
    
    const notificationInApp = this.notificationService.createInAppNotification(message);
    sentPromises.push(this.personNotificationService.createRelation(personId, (await notificationInApp)[0][NOTIFICATION_TABLE.columns.notification_id.getName()]));
    
    if (person.email) {
      const notificationEmail = this.notificationService.createEmailNotification(subject, message);
      sentPromises.push(this.personNotificationService.createRelation(personId, (await notificationEmail)[0][NOTIFICATION_TABLE.columns.notification_id.getName()]));
    }

    if (person.phone_number) {
      const notificationPhone = this.notificationService.createPhoneNotification(message);
      sentPromises.push(this.personNotificationService.createRelation(personId, (await notificationPhone)[0][NOTIFICATION_TABLE.columns.notification_id.getName()]));
    }
    
    return Promise.all(sentPromises).then(() => {
      return;
    }).catch((e) => {
      console.log(e);
      return;
    })
  }
}
