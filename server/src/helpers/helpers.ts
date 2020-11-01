import moment from "moment";
import { InvalidParameterError } from "../errors";
import { ExpectedValueTypes } from "./ExpectedValueTypes";

export const insertValues = (
  attributes: any,
  types: ExpectedValueTypes
): { properties: string; values: string } => {
  const { properties, values } = getPropertiesAndValues(attributes, types);
  return { properties: parenthesis(properties), values: parenthesis(values) };
};

export const updateValues = (
  attributes: any,
  types: ExpectedValueTypes
): string => {
  const { properties, values } = getPropertiesAndValues(attributes, types);

  const map = properties.map((prop, i) => {
    return `${prop} = ${values[i]}`;
  });

  return listify(map);
};

export const getPropertiesAndValues = (
  attributes: any,
  types: ExpectedValueTypes
): { properties: string[]; values: string[] } => {
  const properties: string[] = [];
  const values: any[] = [];

  types.getNotNullableStrings().forEach((property) => {
    properties.push(property);
    values.push(getStringFromAttributes(attributes, property, false));
  });

  types.getNullableStrings().forEach((property) => {
    const value = getStringFromAttributes(attributes, property, true);
    if (value) {
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
    if (value) {
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

  return { properties: properties, values: values };
};

export const getStringFromAttributes = (
  attributes: any,
  property: string,
  nullable: boolean
): string | null => {
  if (attributes.hasOwnProperty(property))
    return stringify(attributes[property]);
  if (nullable) return null;
  throw new InvalidParameterError(property, "string");
};

export const getDateTimeFromAttributes = (
  attributes: any,
  property: string,
  nullable: boolean
): string | null => {
  if (attributes.hasOwnProperty(property)) {
    const dateTime = attributes[property];

    if (moment(dateTime, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid()) {
      return UTCify(stringify(dateTime));
    } else {
      throw new InvalidParameterError(
        property,
        "Date YYYY-MM-DDTHH:mm:ss.SSSZ"
      );
    }
  }
  if (nullable) return null;
  throw new InvalidParameterError(property, "Date YYYY-MM-DDTHH:mm:ss.SSSZ");
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
  return `'${s}'`;
};

export const parenthesis = (strings: string[], join: string = ", "): string => {
  return `(${listify(strings, join)})`;
};

export const listify = (strings: string[], join: string = ", "): string => {
  return strings.join(join);
};

export const UTCify = (s: string): string => {
  return `${s}::TIMESTAMPTZ`;
};
