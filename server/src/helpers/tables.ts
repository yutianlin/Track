// Entity Tables

import ColumnType from "./ColumnType";

export const PERSON_TABLE = {
  tableName: "person",
  columns: {
    person_id: new ColumnType("person_id", "number", false),
    name: new ColumnType("name", "string", false),
    email: new ColumnType("email", "string", true),
    phoneNum: new ColumnType("phone_number", "string", true),
    studentId: new ColumnType("student_id", "number", true),
    facultyId: new ColumnType("faculty_id", "string", true),
    // Technically false, but there is a default for null
    inAppNot: new ColumnType("in_app_notification", "boolean", true),
  },
} as const;

export const FACULTY_TABLE = {
  tableName: "faculty",
  columns: {
    id: new ColumnType("faculty_id", "number", false),
    jobTitle: new ColumnType("job_title", "string", false),
  },
} as const;

export const BUILDING_TABLE = {
  tableName: "ubc_building",
  columns: {
    buildingCode: new ColumnType("building_code", "string", false),
  },
} as const;

export const POSTAL_TABLE = {
  tableName: "postal_address",
  columns: {
    postalCode: new ColumnType("postal_code", "string", false),
  },
} as const;

export const ROOM_TABLE = {
  tableName: "room",
  columns: {
    buildingCode: new ColumnType(
      BUILDING_TABLE.columns.buildingCode.getName(),
      BUILDING_TABLE.columns.buildingCode.getType(),
      false
    ),
    roomNumber: new ColumnType("room_number", "string", false),
  },
} as const;

export const ENTRANCE_TABLE = {
  tableName: "entrance",
  columns: {
    id: new ColumnType("entrance_id", "number", false),
  },
} as const;

export const BIKE_TABLE = {
  tableName: "shared_bike",
  columns: {
    id: new ColumnType("shared_bike_id", "number", false),
  },
} as const;

export const COVID_TESTING_CENTRE_TABLE = {
  tableName: "covid_testing_centre",
  columns: {
    id: new ColumnType("covid_testing_centre_id", "number", false),
  }
} as const;

export const COVID_TEST_TABLE = {
  tableName: "covid_test",
  columns: {
    personId: new ColumnType(PERSON_TABLE.columns.person_id.getName(), PERSON_TABLE.columns.person_id.getType(), false),
    covid_testing_centre_id: new ColumnType(COVID_TESTING_CENTRE_TABLE.columns.id.getName(), COVID_TESTING_CENTRE_TABLE.columns.id.getType(), false),
    test_time: new ColumnType("test_time", "dateTime", false),
    status: new ColumnType("status", "boolean", false),
  }
} as const;

export const BUBBLE_TABLE = {
  tableName: "bubble",
  columns: {
    bubble_id: new ColumnType("bubble_id", "number", false),
    title: new ColumnType("title", "string", false),
    description: new ColumnType("description", "string", false),
  }
} as const;

// Relationship Tables

export const PERSON_TIME_ENTRANCE_TABLE = {
  tableName: "person_time_entrance",
  columns: {
    personId: new ColumnType(
      PERSON_TABLE.columns.person_id.getName(),
      PERSON_TABLE.columns.person_id.getType(),
      false
    ),
    date: new ColumnType("start_time", "dateTime", false),
    entranceId: new ColumnType(
      ENTRANCE_TABLE.columns.id.getName(),
      ENTRANCE_TABLE.columns.id.getType(),
      false
    ),
  },
} as const;

export const PERSON_TIME_BIKE_TABLE = {
  tableName: "person_shared_bike",
  columns: {
    personId: new ColumnType(
      PERSON_TABLE.columns.person_id.getName(),
      PERSON_TABLE.columns.person_id.getType(),
      false
    ),
    bikeId: new ColumnType(
      BIKE_TABLE.columns.id.getName(),
      BIKE_TABLE.columns.id.getType(),
      false
    ),
    rentalTime: new ColumnType("rental_time", "dateTime", false),
  },
} as const;

export const BUBBLE_PERSON_TABLE = {
  tableName: "bubble_person",
  columns: {
    bubble_id: new ColumnType(BUBBLE_TABLE.columns.bubble_id.getName(), BUBBLE_TABLE.columns.bubble_id.getType(), false),
    person_id: new ColumnType(PERSON_TABLE.columns.person_id.getName(), PERSON_TABLE.columns.person_id.getType(), false),
  }
} as const;
