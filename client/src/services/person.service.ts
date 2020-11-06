import {Person} from "../features/person/person.slice";
import {AxiosResponse} from "axios";
import {PersonConversions} from "../conversions/person.conversions";
import {isPresent} from "../util";
import {RemoteService} from "./remote.service";

class PersonService extends RemoteService {
    public async getPersonById(personId: string): Promise<Person> {
        const response: AxiosResponse = await super.get(`persons/${personId}`);
        return response.data[0];
    }

    public async createPerson(person: Person): Promise<Person> {
        let faculty = {};
        if (isPresent(person.faculty_id) && person.faculty_id !== "") {
            const createdFaculty = await super.post("/faculties", PersonConversions.toCreateFacultyRequest(person));
            faculty = createdFaculty.data[0];
        }
        const createdPerson: AxiosResponse = await super.post("persons", PersonConversions.toCreatePersonRequest(person));
        return Promise.resolve({...createdPerson.data[0], ...faculty});
    }
}

export const personService = new PersonService();