export function isPresent(x: any): boolean {
  return x !== null && x !== undefined;
}

export function isStringEmpty(str: string | undefined): boolean {
  return !isPresent(str) || str === "";
}