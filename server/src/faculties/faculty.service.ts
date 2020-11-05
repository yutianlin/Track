import QueryService from "../QueryService";
import {
  GetAllFaculties,
  GetFacultyById,
  CreateFaculty,
  UpdateFacultyById,
} from "./faculty.queries";
import { insertValues, updateValues } from "../helpers/helpers";
import { ExpectedValueTypes } from "../helpers/ExpectedValueTypes";
import { FACULTY_TABLE as F } from "../helpers/tables"

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
    const types = new ExpectedValueTypes(Object.values(F.columns))
    const { properties, values } = insertValues(attributes, types);
    return this.queryService.query(CreateFaculty(properties, values));
  };

  updateFacultyById = async (id: number, attributes: any) => {
    const types = new ExpectedValueTypes(Object.values(F.columns), true);
    const set = updateValues(attributes, types);
    await this.queryService.query(UpdateFacultyById(set, id));
    return this.getFacultyById(id);
  };
}
