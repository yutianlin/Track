import {Person} from "../features/person/person.slice";
import {isPresent} from "../util";
import {toRequestJson} from "./conversions.util";

export class PersonConversions {
  public static toCreatePersonRequest(person: Person): any {
    const personCopy: any =  {...person};
    if (personCopy.hasOwnProperty("job_title")) {
      delete personCopy["job_title"];
    }

    Object.keys(person).forEach((key: string) => {
      if (personCopy[key] === "" || !isPresent(personCopy[key])) {
        delete personCopy[key];
      }
    });
    return toRequestJson(personCopy);
  }

  public static toCreateFacultyRequest(person: Person): any {
    return toRequestJson({
      "faculty_id": person.faculty_id,
      "job_title": person.job_title
    });
  }
}