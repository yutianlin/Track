import {Person} from "../features/person/person.slice";
import {isPresent, isStringEmpty} from "../util";
import {CovidStatus} from "../model/covid_status";

export class PersonConversions {
  private static KEYS_TO_EXCLUDE = new Set(["job_title", "person_status"]);
  private static UPDATE_NULLABLE_KEYS = new Set(["email", "phone_number", "student_id", "faculty_id"])

  public static toPersonRequest(person: Person): any {
    return PersonConversions.copyAndFilterPerson(person, PersonConversions.KEYS_TO_EXCLUDE);
  }

  public static toUpdatePersonRequest(person: Person): any {
    const personCopy: any =  {...person};
    PersonConversions.deleteKeysToExclude(PersonConversions.KEYS_TO_EXCLUDE, personCopy);
    PersonConversions.setNullableFields(PersonConversions.UPDATE_NULLABLE_KEYS, personCopy);
    return personCopy;
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
    PersonConversions.deleteEmptyFieldsAndKeys(personCopy);
    PersonConversions.deleteKeysToExclude(keysToExclude, personCopy);
    return personCopy;
  }

  private static deleteKeysToExclude(keysToDelete: Set<string>, person: any): void {
    Object.keys(person).forEach((key: string) => {
      if (keysToDelete.has(key)) {
        delete person[key];
      }
    });
  }

  private static setNullableFields(nullableFields: Set<string>, person: any): void {
    Object.keys(person).forEach((key: string) => {
      if (nullableFields.has(key) && isStringEmpty(person[key])) {
        person[key] = null;
      }
    });
  }

  private static deleteEmptyFieldsAndKeys(person: any): void {
    Object.keys(person).forEach((key: string) => {
      if (isStringEmpty(person[key])) {
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
