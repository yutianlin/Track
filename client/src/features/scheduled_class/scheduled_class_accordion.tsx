import {ClassDay} from "../../model/class_day";
import React from "react";
import {capitalizeFirstLetter, formatMoment} from "../../util";
import {makeStyles} from "@material-ui/core/styles";
import {accordionStyles} from "../common/accordion.styles";
import {Accordion, AccordionDetails, AccordionSummary, Button, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface ScheduledClassProps {
  classDays: ClassDay[],
  onActionClick: (scheduled_class_id: string) => any,
  actionButtonLabel: string,
  icon: IconDefinition
}

const dayStyles = makeStyles((theme) => ({
  dayContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '2vh'
  },
  actionContainer: {
    display: 'flex',
    marginLeft: 'auto'
  }
}));

export default function ScheduledClassAccordion({classDays, onActionClick, actionButtonLabel, icon}: ScheduledClassProps) {
  const accordionClasses = accordionStyles();
  const dayClasses = dayStyles();
  const startDay: string = formatMoment(classDays[0].start_day);
  const endDay: string = formatMoment(classDays[0].end_day);
  const classId: string = classDays[0].scheduled_class_id;

  const dayInfos = classDays.map(classDay => {
    return (
      <div className = {dayClasses.dayContainer}>
        <Typography color = "textSecondary">
          Day: {`${capitalizeFirstLetter(classDay.day_of_week)}`}
        </Typography>
        <Typography color = "textSecondary">
          Room: {`${classDay.building_code} ${classDay.room_number}`}
        </Typography>
      </div>
    )
  })

  return (
    <Accordion className={accordionClasses.root}>
      <AccordionSummary
        expandIcon = {
          <div className = {dayClasses.actionContainer}>
            <FontAwesomeIcon
              style={{padding: '2px'}}
              onClick={(event) => {
                event.stopPropagation();
                onActionClick(classDays[0].scheduled_class_id)
              }}
              icon = {icon} color="black" size="sm"/>
          </div>}
      >
        <Typography className={accordionClasses.heading}>
          {classId}
        </Typography>
        <Typography className={accordionClasses.secondaryHeading}>
          {capitalizeFirstLetter(classDays[0].activity)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container className={accordionClasses.notificationBody}>
          <Typography>
            {`${classDays[0].class_name} (${startDay} - ${endDay})`}
          </Typography>
          {dayInfos}
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}
