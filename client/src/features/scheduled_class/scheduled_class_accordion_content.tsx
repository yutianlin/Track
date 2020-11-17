import React from "react";
import {ClassDay} from "../../model/class_day";
import {capitalize, formatMoment} from "../../util";
import Typography from "@material-ui/core/Typography";
import {accordionContentStyles} from "../common/accordion_content.styles";

interface ScheduledClassAccordionContentProps {
  classDays: ClassDay[]
}

export default function ScheduledClassAccordionContent({classDays}: ScheduledClassAccordionContentProps) {
  const dayClasses = accordionContentStyles();
  const startDay: string = formatMoment(classDays[0].start_day);
  const endDay: string = formatMoment(classDays[0].end_day);

  const dayInfos = classDays.map(classDay => {
    return (
      <div className = {dayClasses.dayContainer} key={classDay.day_of_week}>
        <Typography color = "textSecondary">
          Day: {`${capitalize(classDay.day_of_week)}`}
        </Typography>
        <Typography color = "textSecondary">
          Room: {`${classDay.building_code} ${classDay.room_number}`}
        </Typography>
      </div>
    )
  })

  return (
      <div style = {{display: 'flex', flexDirection: 'column'}}>
        <Typography>
          {`${classDays[0].class_name} (${startDay} - ${endDay})`}
        </Typography>
        {dayInfos}
      </div>

  )
}