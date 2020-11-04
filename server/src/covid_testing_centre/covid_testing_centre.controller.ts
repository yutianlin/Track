import CovidTestingCentreService from "./covid_testing_centre.service";

const covidTestingCentreService = new CovidTestingCentreService();

module.exports = function (app: any) {
    app.get("/covid_testing_centres", async (request: any, response: any) => {
        response.json(await covidTestingCentreService.getAllCovidTestingCentres());
    });

    app.get("/covid_testing_centres/:id", async (request: any, response: any) => {
        const id = request.params.id;
        response.json(await covidTestingCentreService.getCovidTestingCentreById(id));
    });
};
