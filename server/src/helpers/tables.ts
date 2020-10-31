export const PERSON_TABLE = {
  tableName: "person",
  personId: "person_id",
};

export const FACULTY_TABLE = {
  tableName: "faculty",
  facultyId: "faculty_id",
};

export const BUILDING_TABLE = {
  tableName: "ubc_building",
  buildingCode: "building_code",
};

export const POSTAL_TABLE = {
  tableName: "postal_address",
  postalCode: "postal_code",
}

export const ROOM_TABLE = {
  tableName: "room",
  buildingCode: BUILDING_TABLE.buildingCode,
  roomNumber: "room_number",
}

export const ENTRANCE_TABLE = {
  tableName: "entrance",
  entranceId: "entrance_id",
}