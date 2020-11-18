import {Moment} from "moment-timezone";

export interface ClassDay {
  scheduled_class_id: string,
  start_day: Moment,
  end_day: Moment,
  activity: string,
  class_name: string,
  class_day_id: number,
  day_of_week: DayOfWeek,
  room_number: string,
  building_code: string
}

interface DayOfWeek {
  day_name: string,
  day_number: number
}