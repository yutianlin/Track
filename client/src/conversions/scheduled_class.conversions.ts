import {ClassDay} from "../model/class_day";
import {toMoment} from "./conversions.util";

export class ScheduledClassConversions {
  private static DAY_CONVERSION_MAP = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Sunday"]
  ]);

  public static toClassDays(scheduledClassDatas: any[]): ClassDay[] {
    return scheduledClassDatas.map(ScheduledClassConversions.toClassDay);
  }

  public static toClassDay(scheduledClassData: any): ClassDay {
    const conversionObject = {
      start_day: toMoment(scheduledClassData.start_day),
      end_day: toMoment(scheduledClassData.end_day),
      day_of_week: ScheduledClassConversions.DAY_CONVERSION_MAP.get(scheduledClassData.day_of_week)
    };
    return {...scheduledClassData, ...conversionObject};
  }
}