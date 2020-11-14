import moment from "moment-timezone";

export function toRequestJson(requestData: any): any {
  return {
    data: requestData
  }
}

export const userTimezone: string = moment.tz.guess();
