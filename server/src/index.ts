// important configuration files to load
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// setup express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// setup routes
require("./persons/person.controller")(app);
require("./faculties/faculty.controller")(app);
require("./buildings/building.controller")(app);
require("./postals/postal.controller")(app);
require("./rooms/room.controller")(app);
require("./entrances/entrance.controller")(app);
require("./person_time_entrances/person_time_entrance.controller")(app);
require("./joins/join.controller")(app);
require("./bike/bike.controller")(app);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

app.get("/", (request: any, response: any) => {
  response.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

var server = app.listen(port, "localhost", () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
