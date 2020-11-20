import {Person} from "../features/person/person.slice";
import {AxiosResponse} from "axios";
import {PersonConversions} from "../conversions/person_conversions";
import {isPresent, isStringEmpty} from "../util";
import {RemoteService} from "./remote.service";
import {CovidStatus} from "../model/covid_status";

class PersonService extends RemoteService {
    public async getPersonById(personId: string): Promise<Person> {
        const response: AxiosResponse = await super.get(`/person_faculty_info/${personId}`);
        return PersonConversions.toPerson(response.data[0]);
    }

    public async getPersonStatusById(personId: number | string): Promise<CovidStatus> {
        const response: AxiosResponse = await super.get(`/persons_status/${personId}`);
        const statusString = response.data[0]["person_status"] as string;
        return PersonConversions.toCovidStatus(statusString);
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
        if (!isStringEmpty(person.faculty_id)) {
            const existingFaculty = await super.get(`/faculties/${person.faculty_id}`);
            if (existingFaculty.data.length === 0) {
                const createdFaculty = await super.post("/faculties", PersonConversions.toCreateFacultyRequest(person));
                faculty = createdFaculty.data[0];
            } else {
                const updatedFaculty = await super.patch(`/faculties/${person.faculty_id}`, PersonConversions.toUpdateFacultyRequest(person));
                faculty = updatedFaculty.data[0];
            }
        }
        const updatedPerson: AxiosResponse = await super.patch(`persons/${personId}`, PersonConversions.toUpdatePersonRequest(person));
        return Promise.resolve({...updatedPerson.data[0], ...faculty});
    }
}

export const personService = new PersonService();
