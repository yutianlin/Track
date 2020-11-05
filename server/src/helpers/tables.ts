// Entity Tables

export const PERSON_TABLE = {
  tableName: "person",
  id: "person_id",
};

export const FACULTY_TABLE = {
  tableName: "faculty",
  id: "faculty_id",
};

export const BUILDING_TABLE = {
  tableName: "ubc_building",
  buildingCode: "building_code",
};

export const POSTAL_TABLE = {
  tableName: "postal_address",
  postalCode: "postal_code",
};

export const ROOM_TABLE = {
  tableName: "room",
  buildingCode: BUILDING_TABLE.buildingCode,
  roomNumber: "room_number",
};

export const ENTRANCE_TABLE = {
  tableName: "entrance",
  id: "entrance_id",
};

export const BIKE_TABLE = {
  tableName: "shared_bike",
  id: "shared_bike_id",
};

export const COVID_TESTING_CENTRE_TABLE = {
  tableName: "covid_testing_centre",
  id: "covid_testing_centre_id",
};

export const COVID_TEST_TABLE = {
  tableName: "covid_test",
  personId: PERSON_TABLE.id,
  covidTestingCentreId: COVID_TESTING_CENTRE_TABLE.id,
  testTime: "test_time",
};

export const BUBBLE_TABLE = {
  tableName: "bubble",
  bubbleId: "bubble_id",
};

export const BUBBLE_PERSON_TABLE = {
  tableName: "bubble_person",
  bubbleId: BUBBLE_TABLE.bubbleId,
  personId: PERSON_TABLE.id,
};

// Relationship Tables

export const PERSON_TIME_ENTRANCE_TABLE = {
  tableName: "person_time_entrance",
  personId: PERSON_TABLE.id,
  date: "start_time",
  entranceId: ENTRANCE_TABLE.id,
};

export const PERSON_BIKE_TABLE = {
  tableName: "person_shared_bike",
  personId: PERSON_TABLE.id,
  bikeId: BIKE_TABLE.id,
  rentalTime: "rental_time",
};
