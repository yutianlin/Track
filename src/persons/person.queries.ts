const PERSON_TABLE = {
  tableName: "person",
  personId: "person_id",
};

export const GetAllPersons = `SELECT * FROM ${PERSON_TABLE.tableName}`;

export const GetPersonById = (id: number) =>
  `SELECT * FROM ${PERSON_TABLE.tableName} WHERE ${PERSON_TABLE.personId} = ${id}`;

export const CreatePerson = (
    properties: string,
    values: string
) => `INSERT INTO ${PERSON_TABLE.tableName} ${properties} VALUES ${values} RETURNING *;`;

export const UpdatePerson = (
    valuesPairs: string,
    id: number
// ) => `UPDATE person SET phone_number = 12345 WHERE person_id = 13;`;
) => `UPDATE ${PERSON_TABLE.tableName} SET ${valuesPairs} WHERE ${PERSON_TABLE.personId} = ${id};`;