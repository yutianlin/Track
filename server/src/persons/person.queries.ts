import {
  GetAllRowsFromTable,
  GetRowsWithProjectionSelection,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
  UnionQueries,
  GetRowsWithProjection,
} from "../helpers/queries";

import {
  PERSON_TABLE as P,
  BUBBLE_PERSON_TABLE as BP,
  PERSON_TIME_ENTRANCE_TABLE as PE,
  ENTRANCE_TABLE as E,
  CLASS_DAY_TABLE as C,
  SCHEDULED_CLASS_TABLE as SC,
  PERSON_SCHEDULED_CLASS_TABLE as PSC,
} from "../helpers/tables";

export const GetAllPersons = GetAllRowsFromTable(P.tableName);

export const GetPersonById = (id: number) =>
  GetRowsWithSelection(P.tableName, `${P.columns.person_id.getName()} = ${id}`);

export const GetPersonStatusById = (id: number) =>
  GetRowsWithProjectionSelection(
    P.columns.person_status.getName(),
    P.tableName,
    `${P.columns.person_id.getName()} = ${id}`
  );

export const CreatePerson = (properties: string, values: string) =>
  InsertRow(P.tableName, properties, values);

export const UpdatePersonById = (valuePairs: string, id: number) =>
  UpdateRow(
    P.tableName,
    valuePairs,
    `${P.columns.person_id.getName()} = ${id}`
  );

export const GetPersonsPossiblyInfected = (
  personId: number,
  startDay: string,
  endDay: string
) => {
  const getAllContaminatedBubbleIds = GetRowsWithProjectionSelection(
    `bp2.${BP.columns.bubble_id.getName()}`,
    `${BP.tableName} bp2`,
    `bp2.${BP.columns.person_id.getName()} = ${personId}`
  );
  const getAllPeopleFromBubbleIds = GetRowsWithProjectionSelection(
    `DISTINCT(bp1.${BP.columns.person_id.getName()})`,
    `${BP.tableName} bp1`,
    `bp1.${BP.columns.bubble_id.getName()} IN (${getAllContaminatedBubbleIds})`
  );

  const getAllEntrancesUsedAfterGivenTime = GetRowsWithProjectionSelection(
    `DISTINCT(pe1.${PE.columns.entrance_id.getName()})`,
    `${PE.tableName} pe1`,
    `pe1.${PE.columns.person_id.getName()} = ${personId} AND pe1.${PE.columns.date.getName()} >= ${startDay}`
  );

  const getRoomsOfEntrancesUsed = GetRowsWithProjectionSelection(
    `e1.${E.columns.room_number.getName()}, e1.${E.columns.building_code.getName()}`,
    `${E.tableName} e1`,
    `e1.${E.columns.room_number.getName()} IS NOT NULL
    AND e1.${E.columns.entrance_id.getName()} IN (${getAllEntrancesUsedAfterGivenTime})`
  );

  const getRoomsOfClassesUsed = GetRowsWithProjectionSelection(
    `c1.${C.columns.room_number.getName()},
      c1.${C.columns.building_code.getName()}`,
    `${SC.tableName} sc1
      INNER JOIN ${C.tableName} c1
        ON sc1.${SC.columns.scheduled_class_id.getName()} = c1.${C.columns.scheduled_class_id.getName()}
      INNER JOIN ${PSC.tableName} psc1
        ON sc1.${SC.columns.scheduled_class_id.getName()} = psc1.${PSC.columns.scheduled_class_id.getName()}`,
    `psc1.${PSC.columns.person_id.getName()} = ${personId}
    AND c1.${C.columns.room_number.getName()} IS NOT NULL
    AND sc1.${SC.columns.start_day.getName()} <= ${endDay}
    AND sc1.${SC.columns.end_day.getName()} >= ${startDay}
    AND (sc1.${SC.columns.start_day.getName()} + ((EXTRACT(DOW FROM sc1.${SC.columns.start_day.getName()} at time zone 'UTC') :: BIGINT - c1.${C.columns.day_of_week.getName()} + 7) % 7) * interval '1 day') <= ${endDay}`
  );

  const getRoomsUsed = UnionQueries(
    getRoomsOfClassesUsed,
    getRoomsOfEntrancesUsed
  );

  const getPeopleUsedEntranceToRooms = GetRowsWithProjection(
    `used_rooms t1
      INNER JOIN ${E.tableName} e2
        ON e2.${E.columns.building_code.getName()} = t1.${C.columns.building_code.getName()}
          AND e2.${E.columns.room_number.getName()} = t1.${C.columns.room_number.getName()}
      INNER JOIN ${PE.tableName} pe2
        ON pe2.${PE.columns.entrance_id.getName()} = e2.${E.columns.entrance_id.getName()}`,
    `DISTINCT pe2.${PE.columns.person_id.getName()}`
  );

  const getPeopleInClassesToRooms = GetRowsWithProjectionSelection(
    `DISTINCT psc2.${PSC.columns.person_id.getName()}`,
    `${PSC.tableName} psc2
      INNER JOIN ${SC.tableName} sc2
        ON psc2.${PSC.columns.scheduled_class_id.getName()} = sc2.${SC.columns.scheduled_class_id.getName()}
      INNER JOIN ${C.tableName} c2
        ON psc2.${PSC.columns.scheduled_class_id.getName()} = c2.${C.columns.scheduled_class_id.getName()}
      INNER JOIN used_rooms t2
        ON c2.${C.columns.room_number.getName()} = t2.${C.columns.room_number.getName()}
          AND c2.${C.columns.building_code.getName()} = t2.${C.columns.building_code.getName()}`,
    `sc2.${SC.columns.start_day.getName()} <= ${endDay}
      AND sc2.${SC.columns.end_day.getName()} >= ${startDay}
      AND (sc2.${SC.columns.start_day.getName()} + ((EXTRACT(DOW FROM sc2.${SC.columns.start_day.getName()} at time zone 'UTC') :: BIGINT - c2.${C.columns.day_of_week.getName()} + 7) % 7) * interval '1 day') <= ${endDay}`
  );

  const getPeopleUsedRooms = `WITH used_rooms AS (${getRoomsUsed})
    ((${getPeopleUsedEntranceToRooms}) 
    UNION
    (${getPeopleInClassesToRooms})
    UNION
    (${getAllPeopleFromBubbleIds}))`;

  return getPeopleUsedRooms;
};

export const UpdatePersonsByIdStatusToYellow = (personIds: string) => {
  const updateToYellow = UpdateRow(
    `${P.tableName}`,
    `${P.columns.person_status.getName()} = 'Y'`,
    `${P.columns.person_id.getName()} IN (${personIds})
      AND ${P.columns.person_status.getName()} = 'G'`
  );

  return updateToYellow;
};
