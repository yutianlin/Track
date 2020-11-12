import {
  GetAllRowsFromTable,
  GetRowsWithSelection,
  InsertRow,
  UpdateRow,
  GetRowsWithProjectionSelection,
} from "../helpers/queries";

import {
  PERSON_TABLE as P,
  BUBBLE_PERSON_TABLE as BP,
  PERSON_TIME_ENTRANCE_TABLE as PE,
  ENTRANCE_TABLE as E,
  CLASS_DAY_TABLE as C,
  SCHEDULED_CLASS_TABLE as SC,
} from "../helpers/tables";

export const GetAllPersons = GetAllRowsFromTable(P.tableName);

export const GetPersonById = (id: number) =>
  GetRowsWithSelection(P.tableName, `${P.columns.person_id.getName()} = ${id}`);

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

  const getRoomsOfEntrances = GetRowsWithProjectionSelection(`${E.tableName} e1`,
  `e1.${E.columns.room_number.getName()}, e1.${E.columns.building_code.getName()}`,
  `e1.${E.columns.entrance_id.getName()} IN (${getAllEntrancesUsedAfterGivenTime})`);

  const getRoomsOfClasses = GetRowsWithProjectionSelection(`${SC.tableName} sc1, ${C.tableName} c1`,
  `c1.${C.columns.room_number.getName()}, c1.${C.columns.building_code.getName()}`,
  `sc1.${SC.columns.department.getName()} = c1.${C.columns.department.getName()}
    AND sc1.${SC.columns.code.getName()} = c1.${C.columns.code.getName()}
    AND sc1.${SC.columns.section.getName()} = c1.${C.columns.section.getName()}
    AND sc1.${SC.columns.term.getName()} = c1.${C.columns.term.getName()}
    AND sc1.${SC.columns.year.getName()} = c1.${C.columns.year.getName()}`)

  const mockRoomsOfEntrances = [ { room_number: '110', building_code: 'DMP' } ];

  console.log(getRoomsOfEntrances);
  return getRoomsOfEntrances;
};
