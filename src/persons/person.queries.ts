const PERSON_TABLE = {
    tableName: 'person',
    personId: 'person_id'
}

export const GetAllPersons = `SELECT * FROM ${PERSON_TABLE.tableName}`;

export const GetPersonById = (id: number) => `SELECT * FROM ${PERSON_TABLE.tableName} WHERE ${PERSON_TABLE.personId} = ${id}`;

export const CreatePerson = (
    name: string, 
    inAppNotification: boolean, 
    email: string | null, 
    phoneNum: number | null
) => `INSERT INTO ${PERSON_TABLE.tableName} (name, email, phone_number, in_app_notification) VALUES (${name}, ${email}, ${phoneNum}, ${inAppNotification}) RETURNING *;`
