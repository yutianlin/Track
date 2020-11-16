import moment, {Moment} from "moment-timezone";

export function toRequestJson(requestData: any): any {
  return {
    data: requestData
  }
}

export function toMoment(dateString: string): Moment {
  return moment(dateString).tz(userTimezone)
}

export function toIsoString(dateString: string): string {
  return toMoment(dateString).toISOString();
}

export const userTimezone: string = moment.tz.guess();
