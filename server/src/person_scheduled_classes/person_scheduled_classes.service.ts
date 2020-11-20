import QueryService from "../QueryService";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { insertValues, setValues } from "../helpers/helpers";
import {
  CreateRelation,
  GetAllRelations,
  DeleteRelation,
  GetPersonsInSameClass,
} from "./person_scheduled_classes.queries";
import { PERSON_SCHEDULED_CLASS_TABLE } from "../helpers/tables";

const { tableName, columns } = PERSON_SCHEDULED_CLASS_TABLE;

export default class PersonScheduledClassesService {
  private queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllPersonScheduledClasses = async () => {
    return this.queryService.query(GetAllRelations());
  };

  createPersonScheduledClass = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(columns));
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateRelation(properties, values));
  };

  deletePersonScheduledClass = async (attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(columns));
    const conditions = setValues(attributes, types, " AND ");
    return this.queryService.query(DeleteRelation(conditions));
  };

  getPersonsInSameClass = async (personId: number) => {
    return this.queryService.query(GetPersonsInSameClass(personId));
  };
}
