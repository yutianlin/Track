export class InvalidParameterError extends Error {
  constructor(attribute: string, typeRequired: string) {
    super(`attribute '${attribute}' is invalid, needs to be type '${typeRequired}'`);
  }
}

export class ParameterConstraintError extends Error {
  constructor(attribute: string, constraint: string) {
    super(`attribute '${attribute}' has additional constraint '${constraint}' not met`);
  }
}

export class InvalidTypesError extends Error {
  constructor(valueType: string) {
    super(`ExpectedValueTypes is missing string array for type: ${valueType}`);
  }
}