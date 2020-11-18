import {ClassDay} from "../model/class_day";
import {toMoment} from "./conversions.util";

export class ScheduledClassConversions {
  public static toClassDays(scheduledClassDatas: any[]): ClassDay[] {
    return scheduledClassDatas.map(ScheduledClassConversions.toClassDay);
  }

  public static toClassDay(scheduledClassData: any): ClassDay {
    const dateObject = {
      start_day: toMoment(scheduledClassData.start_day),
      end_day: toMoment(scheduledClassData.end_day)
    };
    return {...scheduledClassData, ...dateObject};
  }
}