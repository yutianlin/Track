import {
  GetAllRowsFromTable, 
  GetRowsWithProjectionSelection,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
  UnionQueries
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
  GetRowsWithProjectionSelection(P.columns.person_status.getName(), P.tableName, `${P.columns.person_id.getName()} = ${id}`)

export const CreatePerson = (properties: string, values: string) =>
  InsertRow(P.tableName, properties, values);

export const UpdatePersonById = (valuePairs: string, id: number) =>
  UpdateRow(
    P.tableName,
    valuePairs,
    `${P.columns.person_id.getName()} = ${id}`
  );

export const UpdatePersonsByIdStatusToYellow = (personId: number, startTime: string, endTime: string) => {
  const getAllContaminatedBubbleIds = GetRowsWithProjectionSelection(
    `${BP.tableName} bp2`,
    `bp2.${BP.columns.bubble_id.getName()}`,
    `bp2.${BP.columns.person_id.getName()} = ${personId}`
  );
  const getAllPeopleFromBubbleIds = GetRowsWithProjectionSelection(`${BP.tableName} bp1`,
  `DISTINCT(bp1.${BP.columns.person_id.getName()})`,
  `bp1.${BP.columns.bubble_id.getName()} IN (${getAllContaminatedBubbleIds})`);
  
  const getAllEntrancesUsedAfterGivenTime = GetRowsWithProjectionSelection(`${PE.tableName} pe1`,
  `DISTINCT(pe1.${PE.columns.entrance_id.getName()})`,
  `pe1.${PE.columns.person_id.getName()} = ${personId} AND pe1.${PE.columns.date.getName()} >= ${startTime}`);

  const getRoomsOfEntrancesUsed = GetRowsWithProjectionSelection(`${E.tableName} e1`,
  `e1.${E.columns.room_number.getName()}, e1.${E.columns.building_code.getName()}`,
  `e1.${E.columns.entrance_id.getName()} IN (${getAllEntrancesUsedAfterGivenTime})`);

  const getRoomsOfClassesUsed = GetRowsWithProjectionSelection(
    `${SC.tableName} sc1
      INNER JOIN ${C.tableName} c1
        ON sc1.${SC.columns.scheduled_class_id.getName()} = c1.${C.columns.scheduled_class_id.getName()},
      INNER JOIN ${PSC.tableName} psc1
        ON sc1.${SC.columns.scheduled_class_id.getName()} = psc1.${PSC.columns.scheduled_class_id.getName()}`,
    `DISTINCT c1.${C.columns.room_number.getName()},
      c1.${C.columns.building_code.getName()},
      sc1.${SC.columns.start_date.getName()},
      sc1.${SC.columns.end_date.getName()}`,
    `psc1.${PSC.columns.person_id.getName()} = ${personId}`
    // `sc1.${SC.columns.start_date.getName()} <= ${endTime}
    //   AND sc1.${SC.columns.end_date.getName()} >= ${startTime}`
  );

  // const getContaminatedRooms = UnionQueries(getRoomsOfEntrances, getRoomsOfClasses);

  // const getPeopleWithClassesInRooms = GetRowsWithProjectionSelection()

  return getRoomsOfClassesUsed;
};
