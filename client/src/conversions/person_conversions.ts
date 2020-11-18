import {Person} from "../features/person/person.slice";
import {isPresent, isStringEmpty} from "../util";
import {CovidStatus} from "../model/covid_status";

export class PersonConversions {
  private static CREATE_KEYS_TO_EXCLUDE = new Set(["job_title", "person_status"]);

  public static toPersonRequest(person: Person): any {
    return PersonConversions.copyAndFilterPerson(person, PersonConversions.CREATE_KEYS_TO_EXCLUDE);
  }

  public static toPerson(response: any): Person {
    const statusObj = {
      person_status: PersonConversions.toCovidStatus(response.person_status)
    };
    return {...response, ...statusObj};
  }

  public static toCovidStatus(statusString: string): CovidStatus {
    if (!isPresent(statusString)) {
      return CovidStatus.NEGATIVE;
    }

    switch(statusString) {
      case 'R':
        return CovidStatus.POSITIVE;
      case 'Y':
        return CovidStatus.INFECTED;
      default:
        return CovidStatus.NEGATIVE;
    }
  }

  private static copyAndFilterPerson(person: Person, keysToExclude: Set<string>): any {
    const personCopy: any =  {...person};
    PersonConversions.deleteEmptyFieldsAndKeys(keysToExclude, personCopy);
    return personCopy;
  }

  private static deleteEmptyFieldsAndKeys(keysToDelete: Set<string>, person: any): void {
    Object.keys(person).forEach((key: string) => {
      if (isStringEmpty(person[key]) || keysToDelete.has(key)) {
        delete person[key];
      }
    });
  }

  public static toCreateFacultyRequest(person: Person): any {
    return {
      "faculty_id": person.faculty_id,
      "job_title": person.job_title
    };
  }

  public static toUpdateFacultyRequest(person: Person): any {
    return {
      "job_title": person.job_title
    };
  }
}
