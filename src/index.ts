import UserService from "./UserService";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const userService = new UserService();
app.get("/", (request: any, response: any) =>
  response.json({ info: `hi ${process.env.POSTGRES_USER}!` })
);
app.get("/users", async (request: any, response: any) =>
  response.json(await userService.getUsers())
);

var server = app.listen(port, "localhost", () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
