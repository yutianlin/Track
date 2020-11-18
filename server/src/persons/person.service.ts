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
} from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { PERSON_TABLE } from "../helpers/tables";
import moment from "moment";
import BubblePersonService from "../person_bubbles/person_bubble.service";
import JoinService from "../joins/join.service";

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

  constructor() {
    this.queryService = new QueryService();
    this.personBubbleService = new BubblePersonService();
    this.joinService = new JoinService();
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

    if (set !== "") {
      await this.queryService.query(UpdatePersonById(set, id));
    }

    if (status.length === 1 && status[0] === `'R'`) {
      await this.updatePersonStatusToPositive(id);
    }
    return this.getPersonById(id);
  };

  updatePersonStatusToPositive = async (id: number) => {
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

  triggerWhenStatusSetToRed = async (personId: number) => {
    const dateNow = moment.utc();
    const dateNowFormatted = `'${dateNow.format("YYYY-MM-DD")}Z'`;
    const dateTwoWeeksAgoFormatted = `'${dateNow
      .subtract(2, "weeks")
      .format("YYYY-MM-DD")}Z'`;

    const personIdsFromBubble: {
      person_id: string;
    }[] = await this.personBubbleService.getAllPersonIdsInBubbleWithPerson(
      personId
    );
    console.log(personIdsFromBubble);
    const personIdsFromEntrance: {
      person_id: string;
    }[] = await this.joinService.getPersonsUsedSameRoomAsPersonbyEntrance(
      personId,
      dateTwoWeeksAgoFormatted,
      dateNowFormatted
    );
    console.log(personIdsFromEntrance);
    const personIdsFromClass: {
      person_id: string;
    }[] = await this.joinService.getPersonsUsedSameRoomAsPersonByClass(
      personId,
      dateTwoWeeksAgoFormatted,
      dateNowFormatted
    );
    console.log(personIdsFromClass);
    const personIdsFromBuilding: {
      person_id: string;
    }[] = await this.joinService.getPersonsUsedSameBuildingsAsPerson(
      personId,
      dateTwoWeeksAgoFormatted,
      dateNowFormatted
    );
    console.log(personIdsFromBuilding);

    const personIdsPossiblyInfected = listify(
      [
        ...personIdsFromBubble,
        ...personIdsFromEntrance,
        ...personIdsFromClass,
      ].map((pId) => pId.person_id)
    );
    await this.queryService.query(
      UpdatePersonsByIdStatusToYellow(personIdsPossiblyInfected)
    );
  };
}
