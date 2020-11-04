import QueryService from "../QueryService";
import {
    CreateCovidTest,
    GetAllCovidTests
} from "./covid_test.queries";
import {ExpectedValueTypes} from "../helpers/ExpectedValueTypes";
import {insertValues} from "../helpers/helpers";

const NOTNULLABLEDATEPROPERTIES = ["person_id", "covid_testing_centre_id"];
const NOTNULLABLESTRINGPROPERTIES = ["test_time"];

export default class CovidTest {
    queryService: QueryService;

    constructor() {
        this.queryService = new QueryService();
    }

    createCovidTest = async (attributes: any) => {
        const types = new ExpectedValueTypes();
        types.setNotNullableStrings(NOTNULLABLESTRINGPROPERTIES);
        types.setNotNullableDateTimes(NOTNULLABLEDATEPROPERTIES);
        const { properties, values } = insertValues(attributes, types);
        return this.queryService.query(CreateCovidTest(properties, values));
    };

    getAllCovidTests = async () => {
        return this.queryService.query(GetAllCovidTests);
    };
}
