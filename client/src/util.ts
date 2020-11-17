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

export function cloneAndUpdateAttribute(originalObj: any, key: string, value: any): any {
  const partialObj: any = {
    [key]: value
  };
  return {...originalObj, ...partialObj};
}

export function formatAddress(obj: any): string {
  const postalAddress: string = `${obj.city} ${obj.province} ${obj.postal_code}`;
  return `${obj.building_number} ${obj.street_number ?? obj.street}\n${postalAddress}`
}

export function capitalizeFirstLetter(str: string): string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}