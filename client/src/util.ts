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

export function formatAddress(obj: any): string {
  const postalAddress: string = `${obj.city} ${obj.province} ${obj.postal_code}`;
  return `${obj.building_number} ${obj.street_number ?? obj.street}\n${postalAddress}`
}

export function capitalize(str: string): string {
  const allWords: string[] = str.split(" ");
  const allWordsCapitalized = allWords.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`);
  return allWordsCapitalized.join(" ");
}

export function pluralize(count: number, str: string): string {
  return count > 1 ? `${str}s` : str;
}

export function capitalizeAndRemoveUnderscores(str: string): string {
  return capitalize(str.replace("_", " "));
}

export function wait(timeout: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timeout);
  });
}
