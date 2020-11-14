import {Moment} from "moment-timezone";

export function isPresent(x: any): boolean {
  return x !== null && x !== undefined;
}

export function isStringEmpty(str: string | undefined): boolean {
  return !isPresent(str) || str === "";
}

export function formatMoment(date: Moment): string {
  return date.calendar().split(" at")[0];
}