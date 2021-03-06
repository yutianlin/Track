import moment from "moment";
import { InvalidParameterError } from "../errors";
import { ExpectedValueTypes } from "./ExpectedValueTypes";

export const insertValues = (
  attributes: any,
  types: ExpectedValueTypes
): { properties: string; values: string } => {
  const { properties, values } = getPropertiesAndValues(attributes, types);
  return { properties: listify(properties), values: listify(values) };
};

export const setValues = (
  attributes: any,
  types: ExpectedValueTypes,
  join: string = ", "
): string => {
  const { properties, values } = getPropertiesAndValues(attributes, types);

  const map = properties.map((prop, i) => {
    return `${prop} = ${values[i]}`;
  });

  return listify(map, join);
};

export const getPropertiesAndValues = (
  attributes: any,
  types: ExpectedValueTypes
): { properties: string[]; values: any[] } => {
  const properties: string[] = [];
  const values: any[] = [];

  types.getNotNullableStrings().forEach((property) => {
    properties.push(property);
    values.push(getStringFromAttributes(attributes, property, false));
  });

  types.getNullableStrings().forEach((property) => {
    const value = getStringFromAttributes(attributes, property, true);
    if (value !== undefined) {
      properties.push(property);
      values.push(value);
    }
  });

  types.getNotNullableBooleans().forEach((property) => {
    properties.push(property);
    values.push(getFromAttributes(attributes, property, "boolean", false));
  });

  types.getNullableBooleans().forEach((property) => {
    const value = getFromAttributes(attributes, property, "boolean", true);
    if (value !== null) {
      properties.push(property);
      values.push(value);
    }
  });

  types.getNotNullableNumbers().forEach((property) => {
    properties.push(property);
    values.push(getFromAttributes(attributes, property, "number", false));
  });

  types.getNullableNumbers().forEach((property) => {
    const value = getFromAttributes(attributes, property, "number", true);
    if (value) {
      properties.push(property);
      values.push(value);
    }
  });

  types.getNotNullableDateTimes().forEach((property) => {
    properties.push(property);
    values.push(getDateTimeFromAttributes(attributes, property, false));
  });

  types.getNullableDateTimes().forEach((property) => {
    const value = getDateTimeFromAttributes(attributes, property, true);
    if (value) {
      properties.push(property);
      values.push(value);
    }
  });

  types.getNotNullableDates().forEach((property) => {
    properties.push(property);
    values.push(getDateTimeFromAttributes(attributes, property, false, true));
  });

  types.getNullableDates().forEach((property) => {
    const value = getDateTimeFromAttributes(attributes, property, true, true);
    if (value) {
      properties.push(property);
      values.push(value);
    }
  });

  return { properties: properties, values: values };
};

export const getStringFromAttributes = (
  attributes: any,
  property: string,
  nullable: boolean
): string | null | undefined => {
  if (attributes.hasOwnProperty(property)) {
    if (nullable && attributes[property] === null) {
      return null;
    } else {
      return stringify(attributes[property].toString());
    }
  }
  if (nullable) return undefined;
  throw new InvalidParameterError(property, "string");
};

export const getDateTimeFromAttributes = (
  attributes: any,
  property: string,
  nullable: boolean,
  onlyDate: boolean = false
): string | null => {
  const dateFormat = onlyDate ? "YYYY-MM-DDZ" : "YYYY-MM-DDTHH:mm:ss.SSSZ";
  if (attributes.hasOwnProperty(property)) {
    const dateTime = moment(attributes[property]).utc();
    if (
      !moment(dateTime, dateFormat, true).isValid() ||
      (onlyDate &&
        (dateTime.hours() !== 0 ||
          dateTime.minutes() !== 0 ||
          dateTime.seconds() !== 0 ||
          dateTime.milliseconds() !== 0))
    ) {
      throw new InvalidParameterError(property, dateFormat);
    }
    return UTCify(stringify(dateTime.toString()));
  }
  if (nullable) return null;
  throw new InvalidParameterError(property, `Date ${dateFormat}`);
};

export const getFromAttributes = (
  attributes: any,
  property: string,
  type: string,
  nullable: boolean
): any => {
  if (attributes.hasOwnProperty(property)) return attributes[property];
  if (nullable) return null;
  throw new InvalidParameterError(property, type);
};

export const stringify = (s: string): string => {
  return `'${s.split("'").join("")}'`;
};

export const listify = (strings: string[], join: string = ", "): string => {
  return strings.join(join);
};

export const UTCify = (s: string): string => {
  return `${s}::TIMESTAMPTZ`;
};

export const getSelectionsFromJson = (jsonBody: any): string => {
  const selections = jsonBody.selection;
  let parsedSelectionsForQuerying = "";
  for (let selection of selections) {
    const table_name = selection.table_name;
    const filters = selection.filters;
    for (let filter of filters) {
      const column = filter.column;
      const filterValue = filter.filter[0];
      const key = table_name + "." + column;
      if (parsedSelectionsForQuerying == "") {
        parsedSelectionsForQuerying =
          parsedSelectionsForQuerying + key + " = " + filterValue;
      } else {
        parsedSelectionsForQuerying =
          parsedSelectionsForQuerying + " AND " + key + " = " + filterValue;
      }
    }
  }
  return parsedSelectionsForQuerying;
};

export const getProjectionsFromJson = (jsonBody: any): string => {
  const projections = jsonBody.projection;
  let parsedProjectionForQuerying = "";
  for (let projection of projections) {
    const table_name = projection.table_name;
    const columns = projection.columns;
    for (let column of columns) {
      const key = table_name + "." + column;
      if (parsedProjectionForQuerying == "") {
        parsedProjectionForQuerying = parsedProjectionForQuerying + key;
      } else {
        parsedProjectionForQuerying = parsedProjectionForQuerying + ", " + key;
      }
    }
  }
  return parsedProjectionForQuerying;
};
