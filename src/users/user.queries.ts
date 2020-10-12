export const GetAllUsers = "SELECT * FROM Users";

export const GetUserById = (id: any) => `SELECT * FROM Users WHERE id = ${id}`;
