import {Person} from "../features/person/person.slice";
import {AxiosResponse} from "axios";
import {PersonConversions} from "../conversions/person.conversions";
import {isPresent, isStringEmpty} from "../util";
import {RemoteService} from "./remote.service";

class PersonService extends RemoteService {
    public async getPersonById(personId: string): Promise<Person> {
        const response: AxiosResponse = await super.get(`persons/${personId}`);
        const person: Person = response.data[0];
        if (!isStringEmpty(person.faculty_id)) {
            const existingFacultyResponse = await super.get(`/faculties/${person.faculty_id}`);
            return {...person, ...existingFacultyResponse.data[0]};
        } else {
            return person;
        }
    }

    public async createPerson(person: Person): Promise<Person> {
        let faculty = {};
        if (isPresent(person.faculty_id) && person.faculty_id !== "") {
            const createdFaculty = await super.post("/faculties", PersonConversions.toCreateFacultyRequest(person));
            faculty = createdFaculty.data[0];
        }
        const createdPerson: AxiosResponse = await super.post("persons", PersonConversions.toPersonRequest(person));
        return Promise.resolve({...createdPerson.data[0], ...faculty});
    }

    public async updatePerson(personId: number, person: Person): Promise<Person> {
        let faculty = {};
        if (isPresent(person.faculty_id) && person.faculty_id !== "") {
            const existingFaculty = await super.get(`/faculties/${person.faculty_id}`);
            if (existingFaculty.data.length === 0) {
                const createdFaculty = await super.post("/faculties", PersonConversions.toCreateFacultyRequest(person));
                faculty = createdFaculty.data[0];
            } else {
                const updatedFaculty = await super.patch(`/faculties/${person.faculty_id}`, PersonConversions.toUpdateFacultyRequest(person));
                faculty = updatedFaculty.data[0];
            }
        }
        const updatedPerson: AxiosResponse = await super.patch(`persons/${personId}`, PersonConversions.toPersonRequest(person));
        return Promise.resolve({...updatedPerson.data[0], ...faculty});
    }
}

export const personService = new PersonService();
