import UserService from "./user.service";

const userService = new UserService();

module.exports = function (app: any) {
  app.get("/users", async (request: any, response: any) =>
    response.json(await userService.getUsers())
  );

  app.get("/user/:id", async (request: any, response: any) => {
    const id = request.params.id;
    response.json(await userService.getUserById(id));
  });
};
