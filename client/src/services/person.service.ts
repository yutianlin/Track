import {PersonState} from "../features/person/person.slice";
import axios, {AxiosResponse} from "axios";
import {PersonConversions} from "../conversions/person.conversions";

export class PersonService {
    public static async getPersonById(personId: string): Promise<PersonState> {
        const response: AxiosResponse = await axios.get(`persons/${personId}`);
        return PersonConversions.toPersonState(response.data);
    }
}