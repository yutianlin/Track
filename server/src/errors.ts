export class InvalidParameterError extends Error {
  constructor(attribute: string, typeRequired: string) {
    super(`attribute '${attribute}' is invalid, needs to be ${typeRequired}`);
  }
}
