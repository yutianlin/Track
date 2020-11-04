// Entity Tables

import ColumnType from "./ColumnType";

export const PERSON_TABLE = {
  tableName: "person",
  id: new ColumnType("person_id", "number", false),
};

export const FACULTY_TABLE = {
  tableName: "faculty",
  id: new ColumnType("faculty_id", "number", false),
  jobTitle: new ColumnType("job_title", "string", false),
};

export const BUILDING_TABLE = {
  tableName: "ubc_building",
  buildingCode: new ColumnType("building_code", "string", false),
};

export const POSTAL_TABLE = {
  tableName: "postal_address",
  postalCode: new ColumnType("postal_code", "string", false),
};

export const ROOM_TABLE = {
  tableName: "room",
  buildingCode: new ColumnType(BUILDING_TABLE.buildingCode.getName(), BUILDING_TABLE.buildingCode.getType(), false),
  roomNumber: new ColumnType("room_number", "string", false),
};

export const ENTRANCE_TABLE = {
  tableName: "entrance",
  id: new ColumnType("entrance_id", "number", false),
};

export const BIKE_TABLE = {
  tableName: "shared_bike",
  id: new ColumnType("shared_bike_id", "number", false),
}

// Relationship Tables

export const PERSON_TIME_ENTRANCE_TABLE = {
  tableName: "person_time_entrance",
  personId: new ColumnType(PERSON_TABLE.id.getName(), PERSON_TABLE.id.getType(), false),
  date: new ColumnType("start_time", "dateTime", false),
  entranceId: new ColumnType(ENTRANCE_TABLE.id.getName(), ENTRANCE_TABLE.id.getType(), false),
};

export const PERSON_BIKE_TABLE = {
  tableName: "person_shared_bike",
  personId: new ColumnType(PERSON_TABLE.id.getName(), PERSON_TABLE.id.getType(), false),
  bikeId: new ColumnType(PERSON_TABLE.id.getName(), PERSON_TABLE.id.getType(), false),
  rentalTime: new ColumnType("rental_time", "dateTime", false),
};