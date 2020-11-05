import {PersonState} from "../features/person/person.slice";

export class PersonConversions {
    public static toPersonState(people: any[]): PersonState {
        const person = people[0];
        return {
            id: person.person_id,
            name: person.name,
            email: person.email,
            phoneNumber: person.phone_number,
            inAppNotification: person.in_app_notification,
            studentId: person.student_id,
            facultyId: person.faculty_id,
            jobTitle: person.job_title
        }
    }
}