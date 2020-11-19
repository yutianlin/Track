import {isPresent} from "../util";

export enum CovidStatus {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  INFECTED = "INFECTED",
  UNKNOWN = "UNKNOWN"
}

export function toCovidStatus(status?: boolean) {
  if (!isPresent(status)) {
    return CovidStatus.UNKNOWN;
  } else if (!status) {
    return CovidStatus.NEGATIVE;
  } else {
    return CovidStatus.POSITIVE;
  }
}
