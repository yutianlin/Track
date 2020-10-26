import { InvalidParameterError } from "./errors";

export const insertValues = (
    attributes: any,
    notNullableStrings: string[],
    nullableStrings: string[],
    notNullableBooleans: string[],
    nullableBooleans: string[],
    notNullableNumbers: string[],
    nullableNumbers: string[],
): { properties: string; values: string } => {
    const {properties, values} = getPropertiesAndValues(
        attributes,
        notNullableStrings,
        nullableStrings,
        notNullableBooleans,
        nullableBooleans,
        notNullableNumbers,
        nullableNumbers
    );
    return {properties: parenthesis(properties), values: parenthesis(values)};
};

export const updateValues = (
    attributes: any,
    notNullableStrings: string[],
    nullableStrings: string[],
    notNullableBooleans: string[],
    nullableBooleans: string[],
    notNullableNumbers: string[],
    nullableNumbers: string[],
): {set: string} => {
    const {properties, values} = getPropertiesAndValues(
        attributes,
        notNullableStrings,
        nullableStrings,
        notNullableBooleans,
        nullableBooleans,
        notNullableNumbers,
        nullableNumbers
    );

    const map = properties.map((prop, i) => { return `${prop} = ${values[i]}`});
    
    return {set: listify(map)};
}

export const getPropertiesAndValues = (
  attributes: any,
  notNullableStrings: string[],
  nullableStrings: string[],
  notNullableBooleans: string[],
  nullableBooleans: string[],
  notNullableNumbers: string[],
  nullableNumbers: string[],
): { properties: string[]; values: string[] } => {
    const properties: string[] = [];
    const values: any[] = [];

    notNullableStrings.forEach(property => {
      properties.push(property);
      values.push(getStringFromAttributes(attributes, property, false));
    });

    nullableStrings.forEach(property => {
        const value = getStringFromAttributes(attributes, property, true);
        if (value) {
            properties.push(property);
            values.push(value);
        }
    })

    notNullableBooleans.forEach(property => {
        properties.push(property);
        values.push(getFromAttributes(attributes, property, 'boolean', false));
    })

    nullableBooleans.forEach(property => {
        const value = getFromAttributes(attributes, property, 'boolean', true);
        if (value) {
            properties.push(property);
            values.push(value);
        }
    })

    notNullableNumbers.forEach(property => {
        properties.push(property);
        values.push(getFromAttributes(attributes, property, 'number', false));
    })

    nullableNumbers.forEach(property => {
        const value = getFromAttributes(attributes, property, 'number', true);
        if (value) {
            properties.push(property);
            values.push(value);
        }
    })

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

export const getFromAttributes = (
    attributes: any,
    property: string,
    type: string,
    nullable: boolean
): any => {
    if (attributes.hasOwnProperty(property))
        return attributes[property];
    if (nullable) return null;
    throw new InvalidParameterError(property, type);
}

export const stringify = (s: string): string => {
    return `'${s}'`;
};

export const parenthesis = (strings: string[]): string => {
    return `(${listify(strings)})`;
};

export const listify = (strings: string[]): string => {
    return strings.join(", ");
}
