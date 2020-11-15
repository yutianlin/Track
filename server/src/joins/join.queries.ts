import {
    GetAllRowsFromTable,
    GetRowsWithProjectionSelection,
    GetRowsWithProjectionSelectionGroupBy,
    GetRowsWithSelection
} from "../helpers/queries";

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
    PERSON_TIME_ENTRANCE_TABLE as PERSON_TIME_ENTRANCE,
    BUBBLE_PERSON_TABLE as BUBBLE_PERSON,
    BUBBLE_TABLE as BUBBLE
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
        `${PERSON.tableName}.${PERSON.columns.person_id.getName()},
        ${PERSON.tableName}.${PERSON.columns.name.getName()},
        ${PERSON.tableName}.${PERSON.columns.person_status.getName()},
        ${COVID_TEST.tableName}.${COVID_TEST.columns.test_time.getName()},
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

export const GetScheduledClassDayInfo = (scheduled_class_id: string) =>
    GetRowsWithSelection(
        `${SCHEDULED_CLASS.tableName}
        LEFT JOIN ${CLASS_DAY.tableName}
            ON ${SCHEDULED_CLASS.tableName}.${CLASS_DAY.columns.scheduled_class_id.getName()} = ${CLASS_DAY.tableName}.${CLASS_DAY.columns.scheduled_class_id.getName()}`,
        `${CLASS_DAY.tableName}.${CLASS_DAY.columns.scheduled_class_id.getName()} ILIKE '%${scheduled_class_id}%'`
    );

export const GetPersonEntranceRoomBuildingTime = (selections: string, projections: string) =>
    GetRowsWithProjectionSelection(projections, `${PERSON.tableName} 
     LEFT JOIN ${PERSON_TIME_ENTRANCE.tableName} 
            ON ${PERSON.tableName}.${PERSON_TIME_ENTRANCE.columns.person_id.getName()} = ${
        PERSON_TIME_ENTRANCE.tableName
    }.${PERSON_TIME_ENTRANCE.columns.person_id.getName()}
    INNER JOIN ${ENTRANCE.tableName}
            ON ${PERSON_TIME_ENTRANCE.tableName}.${ENTRANCE.columns.entrance_id.getName()} = ${
        ENTRANCE.tableName
    }.${ENTRANCE.columns.entrance_id.getName()}
    INNER JOIN ${ROOM.tableName}
            ON ${ENTRANCE.tableName}.${ROOM.columns.room_number.getName()} = ${
        ROOM.tableName
    }.${ROOM.columns.room_number.getName()}
    INNER JOIN ${BUILDING.tableName} 
            ON ${ENTRANCE.tableName}.${BUILDING.columns.building_code.getName()} = ${
        BUILDING.tableName
    }.${BUILDING.columns.building_code.getName()}
    INNER JOIN ${POSTAL.tableName} 
            ON ${BUILDING.tableName}.${POSTAL.columns.postal_code.getName()} = ${
        POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`, selections)

export const GetBubbleCountBySearchTerm = (searchTerm: string) =>
    GetRowsWithProjectionSelectionGroupBy(
        `${BUBBLE.tableName}.${BUBBLE.columns.bubble_id.getName()},
                  ${BUBBLE.tableName}.${BUBBLE.columns.title.getName()},
                  ${BUBBLE.tableName}.${BUBBLE.columns.description.getName()},
                  COUNT(*)`,
        `${BUBBLE.tableName}
        LEFT JOIN ${BUBBLE_PERSON.tableName}
        ON ${BUBBLE.tableName}.${BUBBLE_PERSON.columns.bubble_id.getName()} = ${
         BUBBLE_PERSON.tableName
        }.${BUBBLE_PERSON.columns.bubble_id.getName()}`,
        `${BUBBLE.tableName}.${BUBBLE.columns.title.getName()} ILIKE '%${searchTerm}%' 
                 OR ${BUBBLE.tableName}.${BUBBLE.columns.description.getName()} ILIKE '%${searchTerm}%'`,
        `${BUBBLE.tableName}.${BUBBLE.columns.bubble_id.getName()}`
    );
