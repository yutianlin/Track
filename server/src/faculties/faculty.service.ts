import QueryService from "../QueryService";
import {
  GetAllFaculties,
  GetFacultyById,
  CreateFaculty,
  UpdateFacultyById,
} from "./faculty.queries";
import { insertValues, updateValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";

const NOTNULLABLENUMBERPROPERTIES = ["faculty_id"];
const NOTNULLABLESTRINGPROPERTIES = ["job_title"];

export default class Faculty {
  queryService: QueryService;

  constructor() {
    this.queryService = new QueryService();
  }

  getAllFaculties = async () => {
    return this.queryService.query(GetAllFaculties);
  };

  getFacultyById = async (id: number) => {
    return this.queryService.query(GetFacultyById(id));
  };

  createFaculty = async (attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNotNullableNumbers(NOTNULLABLENUMBERPROPERTIES);
    types.setNotNullableStrings(NOTNULLABLESTRINGPROPERTIES);
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateFaculty(properties, values));
  };

  updateFacultyById = async (id: number, attributes: any) => {
    const types = new ExpectedValueTypes();
    types.setNullableStrings(NOTNULLABLESTRINGPROPERTIES);
    const set = updateValues(attributes, types);
    await this.queryService.query(UpdateFacultyById(set, id));
    return this.getFacultyById(id);
  };
}
