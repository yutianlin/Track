// Entity Tables

import ColumnType from "./ColumnType";

export const PERSON_TABLE = {
  tableName: "person",
  columns: {
    person_id: new ColumnType("person_id", "number", false),
    name: new ColumnType("name", "string", false),
    email: new ColumnType("email", "string", true),
    phone_number: new ColumnType("phone_number", "string", true),
    student_id: new ColumnType("student_id", "number", true),
    faculty_id: new ColumnType("faculty_id", "string", true),
    person_status: new ColumnType("person_status", "string", true),
    // Technically false, but there is a default for null
    in_app_notification: new ColumnType("in_app_notification", "boolean", true),
  },
} as const;

export const FACULTY_TABLE = {
  tableName: "faculty",
  columns: {
    faculty_id: new ColumnType("faculty_id", "number", false),
    job_title: new ColumnType("job_title", "string", false),
  },
} as const;

export const BUILDING_TABLE = {
  tableName: "ubc_building",
  columns: {
    building_code: new ColumnType("building_code", "string", false),
  },
} as const;

export const POSTAL_TABLE = {
  tableName: "postal_address",
  columns: {
    postal_code: new ColumnType("postal_code", "string", false),
    city: new ColumnType("city", "string", false),
    province: new ColumnType("province", "string", false),
  },
} as const;

export const ROOM_TABLE = {
  tableName: "room",
  columns: {
    building_code: new ColumnType(
      BUILDING_TABLE.columns.building_code.getName(),
      BUILDING_TABLE.columns.building_code.getType(),
      false
    ),
    room_number: new ColumnType("room_number", "string", false),
  },
} as const;

export const ENTRANCE_TABLE = {
  tableName: "entrance",
  columns: {
    entrance_id: new ColumnType("entrance_id", "number", false),
    building_code: new ColumnType("building_code", "string", false),
  },
} as const;

export const BIKE_TABLE = {
  tableName: "shared_bike",
  columns: {
    shared_bike_id: new ColumnType("shared_bike_id", "string", false),
    is_rentable: new ColumnType("is_rentable", "boolean", false),
  },
} as const;

export const COVID_TESTING_CENTRE_TABLE = {
  tableName: "covid_testing_centre",
  columns: {
    covid_testing_centre_id: new ColumnType(
      "covid_testing_centre_id",
      "number",
      false
    ),
    name: new ColumnType("name", "string", true),
    building_number: new ColumnType("building_number", "string", false),
    street_number: new ColumnType("street_number", "string", false),
  },
} as const;

export const COVID_TEST_TABLE = {
  tableName: "covid_test",
  columns: {
    person_id: new ColumnType(
      PERSON_TABLE.columns.person_id.getName(),
      PERSON_TABLE.columns.person_id.getType(),
      false
    ),
    covid_testing_centre_id: new ColumnType(
      COVID_TESTING_CENTRE_TABLE.columns.covid_testing_centre_id.getName(),
      COVID_TESTING_CENTRE_TABLE.columns.covid_testing_centre_id.getType(),
      false
    ),
    test_time: new ColumnType("test_time", "dateTime", false),
    test_input_time: new ColumnType("test_input_time", "dateTime", false),
    status: new ColumnType("status", "string", true),
  },
} as const;

export const BUBBLE_TABLE = {
  tableName: "bubble",
  columns: {
    bubble_id: new ColumnType("bubble_id", "number", false),
    title: new ColumnType("title", "string", false),
    description: new ColumnType("description", "string", false),
  },
} as const;

export const SCHEDULED_CLASS_TABLE = {
  tableName: "scheduled_class",
  columns: {
    scheduled_class_id: new ColumnType("scheduled_class_id", "string", false),
    start_date: new ColumnType("start_date", "date", false),
    end_date: new ColumnType("end_date", "date", false),
    activity: new ColumnType("activity", "string", false),
    class_name: new ColumnType("class_name", "string", false),
  },
} as const;

export const CLASS_DAY_TABLE = {
  tableName: "class_day",
  columns: {
    scheduled_class_id: new ColumnType("scheduled_class_id", "string", false),
    class_day_id: new ColumnType("year", "string", false),
    day_of_week: new ColumnType("day_of_week", "string", false),
    room_number: new ColumnType("room_number", "string", true),
    building_code: new ColumnType("building_code", "string", true),
  },
} as const;

export const NOTIFICATION_TABLE = {
  tableName: "notification",
  columns: {
    notification_id: new ColumnType("notification_id", "number", false),
    category: new ColumnType("category", "number", false),
    subject_line: new ColumnType("subject_line", "number", true),
    body: new ColumnType("subject_line", "number", false),
  },
} as const;

// Relationship Tables

export const PERSON_TIME_ENTRANCE_TABLE = {
  tableName: "person_time_entrance",
  columns: {
    person_id: new ColumnType(
      PERSON_TABLE.columns.person_id.getName(),
      PERSON_TABLE.columns.person_id.getType(),
      false
    ),
    date: new ColumnType("start_time", "dateTime", false),
    entrance_id: new ColumnType(
      ENTRANCE_TABLE.columns.entrance_id.getName(),
      ENTRANCE_TABLE.columns.entrance_id.getType(),
      false
    ),
  },
} as const;

export const PERSON_TIME_BIKE_TABLE = {
  tableName: "person_shared_bike",
  columns: {
    person_id: new ColumnType(
      PERSON_TABLE.columns.person_id.getName(),
      PERSON_TABLE.columns.person_id.getType(),
      false
    ),
    bike_id: new ColumnType(
      BIKE_TABLE.columns.shared_bike_id.getName(),
      BIKE_TABLE.columns.shared_bike_id.getType(),
      false
    ),
    rental_time: new ColumnType("rental_time", "dateTime", false),
  },
} as const;

export const BUBBLE_PERSON_TABLE = {
  tableName: "bubble_person",
  columns: {
    bubble_id: new ColumnType(
      BUBBLE_TABLE.columns.bubble_id.getName(),
      BUBBLE_TABLE.columns.bubble_id.getType(),
      false
    ),
    person_id: new ColumnType(
      PERSON_TABLE.columns.person_id.getName(),
      PERSON_TABLE.columns.person_id.getType(),
      false
    ),
  },
} as const;

export const PERSON_SCHEDULED_CLASS_TABLE = {
  tableName: "scheduled_class_person",
  columns: {
    person_id: new ColumnType(
      PERSON_TABLE.columns.person_id.getName(),
      PERSON_TABLE.columns.person_id.getType(),
      false
    ),
    scheduled_class_id: new ColumnType(
      SCHEDULED_CLASS_TABLE.columns.scheduled_class_id.getName(),
      SCHEDULED_CLASS_TABLE.columns.scheduled_class_id.getType(),
      false
    ),
  },
} as const;

export const PERSON_NOTIFICATION_TABLE = {
  tableName: "person_notification",
  columns: {
    person_id: new ColumnType(
      PERSON_TABLE.columns.person_id.getName(),
      PERSON_TABLE.columns.person_id.getType(),
      false
    ),
    notification_id: new ColumnType(
      NOTIFICATION_TABLE.columns.notification_id.getName(),
      NOTIFICATION_TABLE.columns.notification_id.getType(),
      false
    ),
    is_read: new ColumnType("is_read", "string", false),
  },
} as const;
