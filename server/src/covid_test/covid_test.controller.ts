import CovidTestService from "./covid_test.service";
import {createCovidTestSchema} from "./covid_test.schema";

const BodyParser = require("body-parser");

const jsonParser = BodyParser.json();

const covidTestService = new CovidTestService();

module.exports = function (app: any) {
    app.post("/covid_tests", jsonParser, async (request: any, response: any) => {
        const { value, error } = await createCovidTestSchema.validate(
            request.body.data
        );
        if (error) {
            response.status(422).json(error.message);
            return;
        }
        try {
            response.json(await covidTestService.createCovidTest(value));
        } catch (e) {
            response.status(422).json(e.message);
        }
    });

    app.get("/covid_tests", async (request: any, response: any) => {
        response.json(await covidTestService.getAllCovidTests());
    });

    app.get("/covid_tests/:pid/:ctcid/:time", async (request: any, response: any) => {
        const pid = request.params.pid;
        const ctcid = request.params.ctcid;
        const time = request.params.time;
        response.json(await covidTestService.getCovidTest(pid, ctcid, time));
    });

    app.get("/covid_tests/:pid", async (request: any, response: any) => {
        const pid = request.params.pid;
        response.json(await covidTestService.getCovidTestByPerson(pid));
    });

    app.get("/covid_tests/:ctcid", async (request: any, response: any) => {
        const ctcid = request.params.ctcid;
        response.json(await covidTestService.getCovidTestByCentre(ctcid));
    });

    app.get("/covid_tests/:pid/:ctcid", async (request: any, response: any) => {
        const pid = request.params.pid;
        const ctcid = request.params.ctcid;
        response.json(await covidTestService.getCovidTestByPersonAndCentre(pid, ctcid));
    });
};
