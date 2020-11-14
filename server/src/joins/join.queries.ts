import {GetAllRowsFromTable, GetRowsWithProjectionSelection, GetRowsWithSelection} from "../helpers/queries";

import {
    ENTRANCE_TABLE as ENTRANCE,
    ROOM_TABLE as ROOM,
    BUILDING_TABLE as BUILDING,
    POSTAL_TABLE as POSTAL,
    PERSON_TABLE as PERSON,
    FACULTY_TABLE as FACULTY,
    COVID_TEST_TABLE as COVID_TEST,
    COVID_TESTING_CENTRE_TABLE as COVID_TESTING_CENTRE,
    PERSON_TIME_BIKE_TABLE as PERSON_TIME_BIKE,
    PERSON_NOTIFICATION_TABLE as PERSON_NOTIFICATION,
    NOTIFICATION_TABLE as NOTIFICATION,
    SCHEDULED_CLASS_TABLE as SCHEDULED_CLASS,
    CLASS_DAY_TABLE as CLASS_DAY,
    PERSON_TIME_ENTRANCE_TABLE as PERSON_TIME_ENTRANCE
} from "../helpers/tables";

export const GetEntranceInfoById = (entrance_id: number) =>
  GetRowsWithSelection(
    `${ENTRANCE.tableName} 
        LEFT JOIN ${ROOM.tableName} 
            ON ${ENTRANCE.tableName}.${ROOM.columns.room_number.getName()} = ${
      ROOM.tableName
    }.${ROOM.columns.room_number.getName()}
        INNER JOIN ${BUILDING.tableName} 
            ON ${
              ENTRANCE.tableName
            }.${BUILDING.columns.building_code.getName()} = ${
      BUILDING.tableName
    }. ${BUILDING.columns.building_code.getName()}
        INNER JOIN ${POSTAL.tableName} 
            ON ${
              BUILDING.tableName
            }.${POSTAL.columns.postal_code.getName()} = ${
      POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`,
    `${ENTRANCE.columns.entrance_id.getName()} = ${entrance_id}`
  );

export const GetPersonAndFacultyInfoById = (person_id: number) =>
  GetRowsWithSelection(
    `${PERSON.tableName} 
        LEFT JOIN ${FACULTY.tableName} 
            ON ${PERSON.tableName}.${FACULTY.columns.faculty_id.getName()} = ${
      FACULTY.tableName
    }.${FACULTY.columns.faculty_id.getName()}`,
    `${PERSON.columns.person_id.getName()} = ${person_id}`
  );

export const GetAllCovidTestInfoByPersonId = (person_id: number) =>
    GetRowsWithProjectionSelection(
        `${COVID_TEST.tableName}.${COVID_TEST.columns.test_time.getName()},
        ${COVID_TEST.tableName}.${COVID_TEST.columns.test_input_time.getName()},
        ${COVID_TEST.tableName}.${COVID_TEST.columns.status.getName()},
        ${COVID_TESTING_CENTRE.tableName}.${COVID_TESTING_CENTRE.columns.covid_testing_centre_id.getName()},
        ${COVID_TESTING_CENTRE.tableName}.${COVID_TESTING_CENTRE.columns.name.getName()} as CENTRE_NAME,
        ${COVID_TESTING_CENTRE.tableName}.${COVID_TESTING_CENTRE.columns.building_number.getName()},
        ${COVID_TESTING_CENTRE.tableName}.${COVID_TESTING_CENTRE.columns.street_number.getName()},
        ${POSTAL.tableName}.${POSTAL.columns.postal_code.getName()},
        ${POSTAL.tableName}.${POSTAL.columns.city.getName()},
        ${POSTAL.tableName}.${POSTAL.columns.province.getName()}`,
    `${PERSON.tableName}
        LEFT JOIN ${COVID_TEST.tableName}
    ON ${PERSON.tableName}.${COVID_TEST.columns.person_id.getName()} = ${
        COVID_TEST.tableName
    }.${COVID_TEST.columns.person_id.getName()}
        INNER JOIN ${COVID_TESTING_CENTRE.tableName}
            ON ${COVID_TEST.tableName}.${COVID_TESTING_CENTRE.columns.covid_testing_centre_id.getName()} = ${
        COVID_TESTING_CENTRE.tableName
    }.${COVID_TESTING_CENTRE.columns.covid_testing_centre_id.getName()}
        INNER JOIN ${POSTAL.tableName}
            ON ${COVID_TESTING_CENTRE.tableName}.${POSTAL.columns.postal_code.getName()} = ${
        POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`,
        `${COVID_TEST.tableName}.${COVID_TEST.columns.person_id.getName()} = ${person_id}`
  );

export const GetAllPersonBikeInfoById = (person_id: number) =>
    GetRowsWithSelection(
        `${PERSON_TIME_BIKE.tableName}`,
        `${PERSON_TIME_BIKE.columns.person_id.getName()} = ${person_id}`
    );

export const GetAllPersonNotificationInfoById = (person_id: number) =>
    GetRowsWithSelection(
        `${PERSON_NOTIFICATION.tableName}
        LEFT JOIN ${NOTIFICATION.tableName} 
            ON ${PERSON_NOTIFICATION.tableName}.${NOTIFICATION.columns.notification_id.getName()} = ${
            NOTIFICATION.tableName
        }.${NOTIFICATION.columns.notification_id.getName()} 
        `,
        `${PERSON_NOTIFICATION.columns.person_id.getName()} = ${person_id}`
    );

export const GetCovidTestingCentreInfoById = (covid_testing_centre_id: number) =>
    GetRowsWithSelection(
        `${COVID_TESTING_CENTRE.tableName}
        LEFT JOIN ${POSTAL.tableName}
            ON ${COVID_TESTING_CENTRE.tableName}.${POSTAL.columns.postal_code.getName()} = ${
            POSTAL.tableName
        }.${POSTAL.columns.postal_code.getName()}`,
        `${COVID_TESTING_CENTRE.tableName}.${COVID_TESTING_CENTRE.columns.covid_testing_centre_id.getName()} = ${covid_testing_centre_id}`
    );

export const GetAllCovidTestingCentreInfos = () =>
  GetAllRowsFromTable(
    `${COVID_TESTING_CENTRE.tableName}
        LEFT JOIN ${POSTAL.tableName}
            ON ${COVID_TESTING_CENTRE.tableName}.${POSTAL.columns.postal_code.getName()} = ${
      POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`
  );

export const GetScheduledClassDayInfo = (dept: string, code: string, section: string, term: string, year: number) =>
    GetRowsWithSelection(
        `${SCHEDULED_CLASS.tableName}
        LEFT JOIN ${CLASS_DAY.tableName}
            ON ${SCHEDULED_CLASS.tableName}.${CLASS_DAY.columns.department.getName()} = ${CLASS_DAY.tableName}.${CLASS_DAY.columns.department.getName()}
            AND ${SCHEDULED_CLASS.tableName}.${CLASS_DAY.columns.code.getName()} = ${CLASS_DAY.tableName}.${CLASS_DAY.columns.code.getName()}
            AND ${SCHEDULED_CLASS.tableName}.${CLASS_DAY.columns.section.getName()} = ${CLASS_DAY.tableName}.${CLASS_DAY.columns.section.getName()}
            AND ${SCHEDULED_CLASS.tableName}.${CLASS_DAY.columns.term.getName()} = ${CLASS_DAY.tableName}.${CLASS_DAY.columns.term.getName()}
            AND ${SCHEDULED_CLASS.tableName}.${CLASS_DAY.columns.year.getName()} = ${CLASS_DAY.tableName}.${CLASS_DAY.columns.year.getName()}`,
        `${CLASS_DAY.tableName}.${CLASS_DAY.columns.department.getName()} = ${dept} 
                 AND ${CLASS_DAY.tableName}.${CLASS_DAY.columns.code.getName()} = ${code}
                 AND ${CLASS_DAY.tableName}.${CLASS_DAY.columns.section.getName()} = ${section}
                 AND ${CLASS_DAY.tableName}.${CLASS_DAY.columns.term.getName()} = ${term}
                 AND ${CLASS_DAY.tableName}.${CLASS_DAY.columns.year.getName()} = ${year}`
    );
