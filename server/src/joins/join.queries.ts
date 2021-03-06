import {
  GetAllRowsFromTable,
  GetRowsWithProjection,
  GetRowsWithProjectionGroupByHavingOrder,
  GetRowsWithSelection,
  UnionQueries,
  GetRowsWithProjectionSelectionOrderBy,
  GetRowsWithProjectionSelection,
  GetRowsWithProjectionSelectionGroupBy,
  GetRowsWithProjectionGroupByHaving
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
  BUBBLE_TABLE as BUBBLE,
  PERSON_SCHEDULED_CLASS_TABLE as PERSON_SCHEDULED_CLASS,
} from "../helpers/tables";

export const GetEntranceInfoById = (entrance_id: number) =>
  GetRowsWithProjectionSelection(
    `${ENTRANCE.tableName}.${ENTRANCE.columns.entrance_id.getName()},
    ${ROOM.tableName}.${ROOM.columns.room_number.getName()},
    ${ROOM.tableName}.${ROOM.columns.room_type.getName()},
    ${BUILDING.tableName}.${BUILDING.columns.building_code.getName()},
    ${BUILDING.tableName}.${BUILDING.columns.name.getName()}`,
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
    }.${BUILDING.columns.building_code.getName()}`,
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
        ${
          COVID_TESTING_CENTRE.tableName
        }.${COVID_TESTING_CENTRE.columns.covid_testing_centre_id.getName()},
        ${
          COVID_TESTING_CENTRE.tableName
        }.${COVID_TESTING_CENTRE.columns.name.getName()} as CENTRE_NAME,
        ${
          COVID_TESTING_CENTRE.tableName
        }.${COVID_TESTING_CENTRE.columns.building_number.getName()},
        ${
          COVID_TESTING_CENTRE.tableName
        }.${COVID_TESTING_CENTRE.columns.street_number.getName()},
        ${POSTAL.tableName}.${POSTAL.columns.postal_code.getName()},
        ${POSTAL.tableName}.${POSTAL.columns.city.getName()},
        ${POSTAL.tableName}.${POSTAL.columns.province.getName()}`,
    `${PERSON.tableName}
        LEFT JOIN ${COVID_TEST.tableName}
    ON ${PERSON.tableName}.${COVID_TEST.columns.person_id.getName()} = ${
      COVID_TEST.tableName
    }.${COVID_TEST.columns.person_id.getName()}
        INNER JOIN ${COVID_TESTING_CENTRE.tableName}
            ON ${
              COVID_TEST.tableName
            }.${COVID_TESTING_CENTRE.columns.covid_testing_centre_id.getName()} = ${
      COVID_TESTING_CENTRE.tableName
    }.${COVID_TESTING_CENTRE.columns.covid_testing_centre_id.getName()}
        INNER JOIN ${POSTAL.tableName}
            ON ${
              COVID_TESTING_CENTRE.tableName
            }.${POSTAL.columns.postal_code.getName()} = ${
      POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`,
    `${
      COVID_TEST.tableName
    }.${COVID_TEST.columns.person_id.getName()} = ${person_id}`
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
            ON ${
              PERSON_NOTIFICATION.tableName
            }.${NOTIFICATION.columns.notification_id.getName()} = ${
      NOTIFICATION.tableName
    }.${NOTIFICATION.columns.notification_id.getName()} 
        `,
    `${PERSON_NOTIFICATION.columns.person_id.getName()} = ${person_id}`
  );

export const GetCovidTestingCentreInfoById = (
  covid_testing_centre_id: number
) =>
  GetRowsWithSelection(
    `${COVID_TESTING_CENTRE.tableName}
        LEFT JOIN ${POSTAL.tableName}
            ON ${
              COVID_TESTING_CENTRE.tableName
            }.${POSTAL.columns.postal_code.getName()} = ${
      POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`,
    `${
      COVID_TESTING_CENTRE.tableName
    }.${COVID_TESTING_CENTRE.columns.covid_testing_centre_id.getName()} = ${covid_testing_centre_id}`
  );

export const GetAllCovidTestingCentreInfos = () =>
  GetAllRowsFromTable(
    `${COVID_TESTING_CENTRE.tableName}
        LEFT JOIN ${POSTAL.tableName}
            ON ${
              COVID_TESTING_CENTRE.tableName
            }.${POSTAL.columns.postal_code.getName()} = ${
      POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`
  );

export const GetScheduledClassDayInfo = (scheduled_class_id: string) =>
  GetRowsWithSelection(
    `${SCHEDULED_CLASS.tableName}
        LEFT JOIN ${CLASS_DAY.tableName}
            ON ${
              SCHEDULED_CLASS.tableName
            }.${CLASS_DAY.columns.scheduled_class_id.getName()} = ${
      CLASS_DAY.tableName
    }.${CLASS_DAY.columns.scheduled_class_id.getName()}`,
    `${
      CLASS_DAY.tableName
    }.${CLASS_DAY.columns.scheduled_class_id.getName()} ILIKE '%${scheduled_class_id}%'`
  );

export const GetScheduledClassDayInfoByPersonId = (person_id: string) =>
  GetRowsWithProjectionSelection(
    `${
      SCHEDULED_CLASS.tableName
    }.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()},
        ${
          SCHEDULED_CLASS.tableName
        }.${SCHEDULED_CLASS.columns.start_day.getName()},
        ${
          SCHEDULED_CLASS.tableName
        }.${SCHEDULED_CLASS.columns.end_day.getName()},
        ${
          SCHEDULED_CLASS.tableName
        }.${SCHEDULED_CLASS.columns.activity.getName()},
        ${
          SCHEDULED_CLASS.tableName
        }.${SCHEDULED_CLASS.columns.class_name.getName()},
        ${CLASS_DAY.tableName}.${CLASS_DAY.columns.building_code.getName()},
        ${CLASS_DAY.tableName}.${CLASS_DAY.columns.room_number.getName()},
        ${CLASS_DAY.tableName}.${CLASS_DAY.columns.day_of_week.getName()},
        ${CLASS_DAY.tableName}.${CLASS_DAY.columns.class_day_id.getName()}`,
    `${SCHEDULED_CLASS.tableName}
        LEFT JOIN ${CLASS_DAY.tableName}
            ON ${
              SCHEDULED_CLASS.tableName
            }.${CLASS_DAY.columns.scheduled_class_id.getName()} = ${
      CLASS_DAY.tableName
    }.${CLASS_DAY.columns.scheduled_class_id.getName()}
        INNER JOIN ${PERSON_SCHEDULED_CLASS.tableName}
            ON ${
              SCHEDULED_CLASS.tableName
            }.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = ${
      PERSON_SCHEDULED_CLASS.tableName
    }.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()}`,
    `${PERSON_SCHEDULED_CLASS.columns.person_id.getName()} = ${person_id}`
  );

export const GetPersonEntranceRoomBuildingTime = (
  selections: string,
  projections: string
) =>
  GetRowsWithProjectionSelection(
    projections,
    `${PERSON.tableName} 
     LEFT JOIN ${PERSON_TIME_ENTRANCE.tableName} 
            ON ${
              PERSON.tableName
            }.${PERSON_TIME_ENTRANCE.columns.person_id.getName()} = ${
      PERSON_TIME_ENTRANCE.tableName
    }.${PERSON_TIME_ENTRANCE.columns.person_id.getName()}
    INNER JOIN ${ENTRANCE.tableName}
            ON ${
              PERSON_TIME_ENTRANCE.tableName
            }.${ENTRANCE.columns.entrance_id.getName()} = ${
      ENTRANCE.tableName
    }.${ENTRANCE.columns.entrance_id.getName()}
    INNER JOIN ${ROOM.tableName}
            ON ${ENTRANCE.tableName}.${ROOM.columns.room_number.getName()} = ${
      ROOM.tableName
    }.${ROOM.columns.room_number.getName()}
    INNER JOIN ${BUILDING.tableName} 
            ON ${
              ENTRANCE.tableName
            }.${BUILDING.columns.building_code.getName()} = ${
      BUILDING.tableName
    }.${BUILDING.columns.building_code.getName()}
    INNER JOIN ${POSTAL.tableName} 
            ON ${
              BUILDING.tableName
            }.${POSTAL.columns.postal_code.getName()} = ${
      POSTAL.tableName
    }.${POSTAL.columns.postal_code.getName()}`,
    selections
  );

export const GetBubbleCountBySearchTerm = (searchTerm: string) =>
  GetRowsWithProjectionSelectionGroupBy(
    `${BUBBLE.tableName}.${BUBBLE.columns.bubble_id.getName()},
                  ${BUBBLE.tableName}.${BUBBLE.columns.title.getName()},
                  ${BUBBLE.tableName}.${BUBBLE.columns.description.getName()},
                  COUNT(${
                    BUBBLE_PERSON.tableName
                  }.${BUBBLE_PERSON.columns.person_id.getName()})`,
    `${BUBBLE.tableName}
        LEFT JOIN ${BUBBLE_PERSON.tableName}
        ON ${BUBBLE.tableName}.${BUBBLE_PERSON.columns.bubble_id.getName()} = ${
      BUBBLE_PERSON.tableName
    }.${BUBBLE_PERSON.columns.bubble_id.getName()}`,
    `${
      BUBBLE.tableName
    }.${BUBBLE.columns.title.getName()} ILIKE '%${searchTerm}%' 
                 OR ${
                   BUBBLE.tableName
                 }.${BUBBLE.columns.description.getName()} ILIKE '%${searchTerm}%'`,
    `${BUBBLE.tableName}.${BUBBLE.columns.bubble_id.getName()}`
  );

export const GetBubbleCountByPersonId = (personId: number) =>
  GetRowsWithProjectionSelectionGroupBy(
    `${BUBBLE.tableName}.${BUBBLE.columns.bubble_id.getName()},
                  ${BUBBLE.tableName}.${BUBBLE.columns.title.getName()},
                  ${BUBBLE.tableName}.${BUBBLE.columns.description.getName()},
                  COUNT(BP1.${BUBBLE_PERSON.columns.person_id.getName()})`,
    `${BUBBLE.tableName}
        LEFT JOIN ${BUBBLE_PERSON.tableName} BP1
        ON ${
          BUBBLE.tableName
        }.${BUBBLE_PERSON.columns.bubble_id.getName()} = BP1.${BUBBLE_PERSON.columns.bubble_id.getName()}`,
    `BP1.${BUBBLE_PERSON.columns.bubble_id.getName()} IN (
    SELECT BP2.${BUBBLE_PERSON.columns.bubble_id.getName()} 
    FROM ${BUBBLE_PERSON.tableName} BP2
    WHERE BP2.${BUBBLE_PERSON.columns.person_id.getName()} = ${personId})`,
    `${BUBBLE.tableName}.${BUBBLE.columns.bubble_id.getName()}`
  );

export const GetLargestScheduledClass = () =>
  GetRowsWithProjectionGroupByHaving(
    `${
      SCHEDULED_CLASS.tableName
    }.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()},
                  COUNT(*)`,
    `${PERSON_SCHEDULED_CLASS.tableName}
        INNER JOIN ${SCHEDULED_CLASS.tableName}
        ON ${
          SCHEDULED_CLASS.tableName
        }.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = ${
      PERSON_SCHEDULED_CLASS.tableName
    }.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()}`,
    `${
      SCHEDULED_CLASS.tableName
    }.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()}`,
    `COUNT(*) >= ALL(SELECT COUNT(*) 
                                FROM ${SCHEDULED_CLASS.tableName}
                            INNER JOIN ${PERSON_SCHEDULED_CLASS.tableName}
                            ON ${
                              SCHEDULED_CLASS.tableName
                            }.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = ${
      PERSON_SCHEDULED_CLASS.tableName
    }.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()}
                            GROUP BY ${
                              SCHEDULED_CLASS.tableName
                            }.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()})`
  );

export const GetAllUnreadNotificationsByPersonId = (personId: number) =>
  GetRowsWithProjectionSelection(
    `${
      NOTIFICATION.tableName
    }.${NOTIFICATION.columns.notification_id.getName()},
                  ${
                    NOTIFICATION.tableName
                  }.${NOTIFICATION.columns.category.getName()},
                  ${
                    NOTIFICATION.tableName
                  }.${NOTIFICATION.columns.subject_line.getName()},
                  ${
                    NOTIFICATION.tableName
                  }.${NOTIFICATION.columns.body.getName()},
                  ${
                    PERSON_NOTIFICATION.tableName
                  }.${PERSON_NOTIFICATION.columns.is_read.getName()}`,
    `${PERSON_NOTIFICATION.tableName}
        LEFT JOIN ${NOTIFICATION.tableName}
        ON ${
          NOTIFICATION.tableName
        }.${PERSON_NOTIFICATION.columns.notification_id.getName()} = ${
      PERSON_NOTIFICATION.tableName
    }.${PERSON_NOTIFICATION.columns.notification_id.getName()}
        INNER JOIN ${PERSON.tableName}
        ON ${PERSON.tableName}.${PERSON.columns.person_id.getName()} = ${
      PERSON_NOTIFICATION.tableName}.${PERSON_NOTIFICATION.columns.person_id.getName()}`,
    `${
      PERSON_NOTIFICATION.tableName
    }.${PERSON_NOTIFICATION.columns.person_id.getName()} = ${personId}
                 AND ${
                   PERSON_NOTIFICATION.tableName
                 }.${PERSON_NOTIFICATION.columns.is_read.getName()} = FALSE
                 AND ${NOTIFICATION.tableName}.${NOTIFICATION.columns.category.getName()} = 'inApp'
                 AND ${PERSON.tableName}.${PERSON.columns.in_app_notification.getName()} = TRUE`
  );

export const GetFrequentlyUsedBuildings = () =>
    GetRowsWithProjectionGroupByHavingOrder(
    `${ENTRANCE.tableName}.${ENTRANCE.columns.building_code.getName()},
                  COUNT(*)`,
    `${PERSON_TIME_ENTRANCE.tableName}
        INNER JOIN ${ENTRANCE.tableName}
        ON ${
          ENTRANCE.tableName
        }.${PERSON_TIME_ENTRANCE.columns.entrance_id.getName()} = ${
      PERSON_TIME_ENTRANCE.tableName
    }.${PERSON_TIME_ENTRANCE.columns.entrance_id.getName()}`,
    `${ENTRANCE.tableName}.${ENTRANCE.columns.building_code.getName()}`,
      `COUNT(*) > 0`,
      `COUNT(*) desc LIMIT 3`
  );

export const GetPersonAllBubbles = () =>
  GetRowsWithProjectionSelection(
    `${PERSON.tableName}.${PERSON.columns.person_id.getName()},
                   ${PERSON.tableName}.${PERSON.columns.name.getName()}`,
    `${PERSON.tableName}`,
    `NOT EXISTS ((SELECT ${
      BUBBLE.tableName
    }.${BUBBLE.columns.bubble_id.getName()}
                              FROM ${BUBBLE.tableName})
                              EXCEPT
                              (SELECT ${
                                BUBBLE_PERSON.tableName
                              }.${BUBBLE_PERSON.columns.bubble_id.getName()}
                               FROM ${BUBBLE_PERSON.tableName}
                               WHERE ${
                                 PERSON.tableName
                               }.${PERSON.columns.person_id.getName()} = ${
      BUBBLE_PERSON.tableName
    }.${BUBBLE_PERSON.columns.person_id.getName()}))`
  );

export const GetPersonAllBubblesBySearchTerm = (searchTerm: string) =>
  GetRowsWithProjectionSelection(
    `${PERSON.tableName}.${PERSON.columns.person_id.getName()},
                   ${PERSON.tableName}.${PERSON.columns.name.getName()}`,
    `${PERSON.tableName}`,
    `NOT EXISTS ((SELECT ${
      BUBBLE.tableName
    }.${BUBBLE.columns.bubble_id.getName()}
                              FROM ${BUBBLE.tableName}
                              WHERE ${
                                BUBBLE.tableName
                              }.${BUBBLE.columns.description.getName()} ILIKE '%${searchTerm}%'
                              OR ${
                                BUBBLE.tableName
                              }.${BUBBLE.columns.title.getName()} ILIKE '%${searchTerm}%')
                              EXCEPT
                              (SELECT ${
                                BUBBLE_PERSON.tableName
                              }.${BUBBLE_PERSON.columns.bubble_id.getName()}
                               FROM ${BUBBLE_PERSON.tableName}
                               WHERE ${
                                 PERSON.tableName
                               }.${PERSON.columns.person_id.getName()} = ${
      BUBBLE_PERSON.tableName
    }.${BUBBLE_PERSON.columns.person_id.getName()}))`
  );

const GetRoomsUsedByAPerson = (
  personId: number,
  startDay: string,
  endDay: string
) => {
  const getAllEntrancesUsedAfterGivenTime = GetRowsWithProjectionSelection(
    `pe1.${PERSON_TIME_ENTRANCE.columns.entrance_id.getName()},
      pe1.${PERSON_TIME_ENTRANCE.columns.date.getName()}`,
    `${PERSON_TIME_ENTRANCE.tableName} pe1`,
    `pe1.${PERSON_TIME_ENTRANCE.columns.person_id.getName()} = ${personId} 
      AND pe1.${PERSON_TIME_ENTRANCE.columns.date.getName()} >= ${startDay}
      AND pe1.${PERSON_TIME_ENTRANCE.columns.date.getName()} - interval '1 day' <= ${endDay}`
  );

  const getRoomsOfEntrancesUsed = GetRowsWithProjectionSelection(
    `e1.${ENTRANCE.columns.room_number.getName()}, 
      e1.${ENTRANCE.columns.building_code.getName()},
      pe4.${PERSON_TIME_ENTRANCE.columns.date.getName()}`,
    `${ENTRANCE.tableName} e1
      INNER JOIN (${getAllEntrancesUsedAfterGivenTime}) pe4
        ON e1.${ENTRANCE.columns.entrance_id.getName()} = pe4.${PERSON_TIME_ENTRANCE.columns.entrance_id.getName()}`,
    `e1.${ENTRANCE.columns.room_number.getName()} IS NOT NULL`
  );

  const getListOfDays = `SELECT * FROM 
  (SELECT ${startDay}::timestamptz + s*'1day'::interval as datum from 
    generate_series(0, (SELECT DATE_PART('day', ${endDay}::timestamp - ${startDay}::timestamp)) :: bigint + 1) s)foo`

  const getRoomsOfClassesUsed = GetRowsWithProjectionSelection(
    `c1.${CLASS_DAY.columns.room_number.getName()},
      c1.${CLASS_DAY.columns.building_code.getName()},
      lod1.datum`,
    `${SCHEDULED_CLASS.tableName} sc1
      INNER JOIN ${CLASS_DAY.tableName} c1
        ON sc1.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = c1.${CLASS_DAY.columns.scheduled_class_id.getName()}
      INNER JOIN ${PERSON_SCHEDULED_CLASS.tableName} psc1
        ON sc1.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = psc1.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()}
      CROSS JOIN (${getListOfDays}) lod1`,
    `psc1.${PERSON_SCHEDULED_CLASS.columns.person_id.getName()} = ${personId}
    AND c1.${CLASS_DAY.columns.room_number.getName()} IS NOT NULL
    AND extract(dow from lod1.datum)=c1.${CLASS_DAY.columns.day_of_week.getName()}
    AND (sc1.${SCHEDULED_CLASS.columns.start_day.getName()} + ((EXTRACT(DOW FROM sc1.${SCHEDULED_CLASS.columns.start_day.getName()} at time zone 'UTC') :: BIGINT - c1.${CLASS_DAY.columns.day_of_week.getName()} + 7) % 7) * interval '1 day') <= ${endDay}`
  );

  const getRoomsUsed = UnionQueries(
    getRoomsOfClassesUsed,
    getRoomsOfEntrancesUsed
  );

  return getRoomsUsed;
};

export const GetPersonsUsedSameRoomAsAPersonByEntrance = (
  personId: number,
  startDay: string,
  endDay: string
) => {
  const getRoomsUsed = GetRoomsUsedByAPerson(personId, startDay, endDay);

  const getPeopleUsedEntranceToRooms = GetRowsWithProjectionSelectionOrderBy(
    `DISTINCT pe3.${PERSON_TIME_ENTRANCE.columns.person_id.getName()}, 
      pe3.${PERSON_TIME_ENTRANCE.columns.date.getName()},
      e2.${ENTRANCE.columns.room_number.getName()},
      e2.${ENTRANCE.columns.building_code.getName()}`,
    `used_rooms t1
      INNER JOIN ${ENTRANCE.tableName} e2
        ON e2.${ENTRANCE.columns.building_code.getName()} = t1.${CLASS_DAY.columns.building_code.getName()}
          AND e2.${ENTRANCE.columns.room_number.getName()} = t1.${CLASS_DAY.columns.room_number.getName()}
      INNER JOIN ${PERSON_TIME_ENTRANCE.tableName} pe3
        ON pe3.${PERSON_TIME_ENTRANCE.columns.entrance_id.getName()} = e2.${ENTRANCE.columns.entrance_id.getName()}`,
    `pe3.${PERSON_TIME_ENTRANCE.columns.person_id.getName()} <> ${personId}
      AND t1.datum <= pe3.${PERSON_TIME_ENTRANCE.columns.date.getName()}
      AND t1.datum + interval '1 day' >= pe3.${PERSON_TIME_ENTRANCE.columns.date.getName()}`,
    `pe3.${PERSON_TIME_ENTRANCE.columns.date.getName()}`
  );

  const getPeopleUsedRooms = `WITH used_rooms AS (${getRoomsUsed})
    (${getPeopleUsedEntranceToRooms})`;

  return getPeopleUsedRooms;
};

export const GetPersonsUsedSameRoomAsAPersonByClass = (
  personId: number,
  startDay: string,
  endDay: string
) => {
  const getRoomsUsed = GetRoomsUsedByAPerson(personId, startDay, endDay);

  const getPersonsInClassToRooms = GetRowsWithProjectionSelectionOrderBy(
    `DISTINCT psc2.${PERSON_SCHEDULED_CLASS.columns.person_id.getName()}, 
      psc2.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()},
      c2.${CLASS_DAY.columns.room_number.getName()},
      c2.${CLASS_DAY.columns.building_code.getName()}`,
    `${PERSON_SCHEDULED_CLASS.tableName} psc2
      INNER JOIN ${SCHEDULED_CLASS.tableName} sc2
        ON psc2.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = sc2.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()}
      INNER JOIN ${CLASS_DAY.tableName} c2
        ON psc2.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = c2.${CLASS_DAY.columns.scheduled_class_id.getName()}
      INNER JOIN used_rooms t2
        ON c2.${CLASS_DAY.columns.room_number.getName()} = t2.${CLASS_DAY.columns.room_number.getName()}
          AND c2.${CLASS_DAY.columns.building_code.getName()} = t2.${CLASS_DAY.columns.building_code.getName()}`,
    `psc2.${PERSON_SCHEDULED_CLASS.columns.person_id.getName()} <> ${personId}
      AND (${startDay}::timestamptz + ((EXTRACT(DOW FROM ${startDay}::timestamptz at time zone 'UTC') :: BIGINT - c2.${CLASS_DAY.columns.day_of_week.getName()} + 7) % 7) * interval '1 day') >= t2.datum
      AND (${startDay}::timestamptz + ((EXTRACT(DOW FROM ${startDay}::timestamptz at time zone 'UTC') :: BIGINT - c2.${CLASS_DAY.columns.day_of_week.getName()} + 7) % 7) * interval '1 day') <= t2.datum + interval '1 day'`,
    `psc2.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()},
      c2.${CLASS_DAY.columns.building_code.getName()},
      c2.${CLASS_DAY.columns.room_number.getName()}`
  );

  const getPeopleUsedRooms = `WITH used_rooms AS (${getRoomsUsed})
    (${getPersonsInClassToRooms})`;

  return getPeopleUsedRooms;
};

export const GetPersonsUsedBuildingsUsedByAPerson = (
  personId: number,
  startDay: string,
  endDay: string
) => {
  const getAllEntrancesUsedAfterGivenTime = GetRowsWithProjectionSelection(
    `DISTINCT pe1.${PERSON_TIME_ENTRANCE.columns.entrance_id.getName()},
      pe1.${PERSON_TIME_ENTRANCE.columns.date.getName()}`,
    `${PERSON_TIME_ENTRANCE.tableName} pe1`,
    `pe1.${PERSON_TIME_ENTRANCE.columns.person_id.getName()} = ${personId} 
      AND pe1.${PERSON_TIME_ENTRANCE.columns.date.getName()} >= ${startDay}
      AND pe1.${PERSON_TIME_ENTRANCE.columns.date.getName()} - interval '1 day' <= ${endDay}`
  );

  const getBuildingsOfEntrancesUsed = GetRowsWithProjection(
    `${ENTRANCE.tableName} e1
      INNER JOIN (${getAllEntrancesUsedAfterGivenTime}) eu1
        ON e1.${ENTRANCE.columns.entrance_id.getName()} = eu1.${PERSON_TIME_ENTRANCE.columns.entrance_id.getName()}`,
    `DISTINCT e1.${ENTRANCE.columns.building_code.getName()},
      eu1.${PERSON_TIME_ENTRANCE.columns.date.getName()}`
  )

  const getListOfDays = `SELECT * FROM 
  (SELECT ${startDay}::timestamptz + s*'1day'::interval as datum from 
    generate_series(0, (SELECT DATE_PART('day', ${endDay}::timestamp - ${startDay}::timestamp)) :: bigint + 1) s)foo`

  const getBuildingsOfClassesUsed = GetRowsWithProjectionSelection(
    `c1.${CLASS_DAY.columns.building_code.getName()},
      lod2.datum`,
    `${SCHEDULED_CLASS.tableName} sc1
      INNER JOIN ${CLASS_DAY.tableName} c1
        ON sc1.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = c1.${CLASS_DAY.columns.scheduled_class_id.getName()}
      INNER JOIN ${PERSON_SCHEDULED_CLASS.tableName} psc1
        ON sc1.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = psc1.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()}
      CROSS JOIN (${getListOfDays}) lod2`,
    `psc1.${PERSON_SCHEDULED_CLASS.columns.person_id.getName()} = ${personId}
    AND extract(dow from lod2.datum) = c1.${CLASS_DAY.columns.day_of_week.getName()}
    AND (sc1.${SCHEDULED_CLASS.columns.start_day.getName()} + ((EXTRACT(DOW FROM sc1.${SCHEDULED_CLASS.columns.start_day.getName()} at time zone 'UTC') :: BIGINT - c1.${CLASS_DAY.columns.day_of_week.getName()} + 7) % 7) * interval '1 day') <= ${endDay}`
  );

  const getBuildingsUsed = UnionQueries(
    getBuildingsOfEntrancesUsed,
    getBuildingsOfClassesUsed
  );

  const getPeopleUsedEntranceToBuildings = GetRowsWithProjectionSelection(
    `DISTINCT pe2.${PERSON_TIME_ENTRANCE.columns.person_id.getName()},
      e2.${ENTRANCE.columns.building_code.getName()}`,
    `used_buildings t1
      INNER JOIN ${ENTRANCE.tableName} e2
        ON e2.${ENTRANCE.columns.building_code.getName()} = t1.${CLASS_DAY.columns.building_code.getName()}
      INNER JOIN ${PERSON_TIME_ENTRANCE.tableName} pe2
        ON pe2.${PERSON_TIME_ENTRANCE.columns.entrance_id.getName()} = e2.${ENTRANCE.columns.entrance_id.getName()}`,
    `pe2.${PERSON_TIME_ENTRANCE.columns.person_id.getName()} <> ${personId}
      AND t1.${PERSON_TIME_ENTRANCE.columns.date.getName()} <= pe2.${PERSON_TIME_ENTRANCE.columns.date.getName()}
      AND t1.${PERSON_TIME_ENTRANCE.columns.date.getName()} + interval '1 day' >= pe2.${PERSON_TIME_ENTRANCE.columns.date.getName()}`
  );

  const getPeopleInClassesToBuildings = GetRowsWithProjectionSelection(
    `DISTINCT psc2.${PERSON_SCHEDULED_CLASS.columns.person_id.getName()},
      c2.${CLASS_DAY.columns.building_code.getName()}`,
    `${PERSON_SCHEDULED_CLASS.tableName} psc2
      INNER JOIN ${SCHEDULED_CLASS.tableName} sc2
        ON psc2.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = sc2.${SCHEDULED_CLASS.columns.scheduled_class_id.getName()}
      INNER JOIN ${CLASS_DAY.tableName} c2
        ON psc2.${PERSON_SCHEDULED_CLASS.columns.scheduled_class_id.getName()} = c2.${CLASS_DAY.columns.scheduled_class_id.getName()}
      INNER JOIN used_buildings t2
        ON c2.${CLASS_DAY.columns.building_code.getName()} = t2.${CLASS_DAY.columns.building_code.getName()}`,
    `psc2.${PERSON_SCHEDULED_CLASS.columns.person_id.getName()} <> ${personId}
    AND (${startDay}::timestamptz + ((EXTRACT(DOW FROM ${startDay}::timestamptz at time zone 'UTC') :: BIGINT - c2.${CLASS_DAY.columns.day_of_week.getName()} + 7) % 7) * interval '1 day') >= t2.${PERSON_TIME_ENTRANCE.columns.date.getName()}
    AND (${startDay}::timestamptz + ((EXTRACT(DOW FROM ${startDay}::timestamptz at time zone 'UTC') :: BIGINT - c2.${CLASS_DAY.columns.day_of_week.getName()} + 7) % 7) * interval '1 day') <= t2.${PERSON_TIME_ENTRANCE.columns.date.getName()} + interval '1 day'`
  );

  const getPeopleUsedBuildings = `WITH used_buildings AS (${getBuildingsUsed})
    ((${getPeopleUsedEntranceToBuildings}) 
    UNION
    (${getPeopleInClassesToBuildings}))`;

  return getPeopleUsedBuildings;
};

export const GetPersonsUsedBikeByAPerson = (
  personId: number,
  startTime: string,
  endTime: string
) => {
  const getUsedBikes = GetRowsWithProjectionSelection(
    `b1.${PERSON_TIME_BIKE.columns.bike_id.getName()}`,
    `${PERSON_TIME_BIKE.tableName} b1`,
    `b1.${PERSON_TIME_BIKE.columns.person_id.getName()} = ${personId}
      AND b1.${PERSON_TIME_BIKE.columns.rental_time.getName()} <= ${endTime}
      AND b1.${PERSON_TIME_BIKE.columns.rental_time.getName()} >= ${startTime}
      AND b1.${PERSON_TIME_BIKE.columns.rental_time.getName()} > b2.${PERSON_TIME_BIKE.columns.rental_time.getName()} - interval '1 day'
      AND b1.${PERSON_TIME_BIKE.columns.rental_time.getName()} < b2.${PERSON_TIME_BIKE.columns.rental_time.getName()}`
  );

  const getPersonUsedSameBikes = GetRowsWithProjectionSelectionOrderBy(
    `*`,
    `${PERSON_TIME_BIKE.tableName} b2`,
    `b2.${PERSON_TIME_BIKE.columns.person_id.getName()} <> ${personId}
      AND ${PERSON_TIME_BIKE.columns.bike_id.getName()} IN (${getUsedBikes})`,
    `${PERSON_TIME_BIKE.columns.rental_time.getName()}`
  );

  return getPersonUsedSameBikes;
}
