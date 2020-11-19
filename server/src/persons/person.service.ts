import QueryService from "../QueryService";
import {
  GetAllPersons,
  GetPersonById,
  CreatePerson,
  UpdatePersonById,
  UpdatePersonsByIdStatusToYellow,
  GetPersonsPossiblyInfected,
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

  constructor() {
    this.queryService = new QueryService();
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

    if (attributes.hasOwnProperty(columns.person_status.getName()) && attributes[columns.person_status.getName()] === 'R') {
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
    const dateNowFormatted = dateNow.format("YYYY-MM-DD");
    const dateTwoWeeksAgoFormatted = dateNow
      .subtract(2, "weeks")
      .format("YYYY-MM-DD");
    const personIdsPossiblyInfected: {
      person_id: string;
    }[] = await this.queryService.query(
      GetPersonsPossiblyInfected(
        personId,
        `'${dateTwoWeeksAgoFormatted}Z'`,
        `'${dateNowFormatted}Z'`
      )
    );
    const set = listify(personIdsPossiblyInfected.map((pId) => pId.person_id));
    await this.queryService.query(UpdatePersonsByIdStatusToYellow(set))
  };
}
