import {NotificationModel, NotificationCategory} from "../../model/notification";
import {formatMoment} from "../../util";
import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Container} from "@material-ui/core";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {accordionStyles} from "../common/accordion.styles";
import Typography from "@material-ui/core/Typography";

interface NotificationModalProps {
  notificationModels: NotificationModel[]
}

export default function NotificationAccordion({ notificationModels } : NotificationModalProps) {
  const dateString = `Sent on: ${formatMoment(notificationModels[0].notification_time)}`;
  const categoryString = `Sent through: ${notificationModels.map(model => model.category).join(", ")}`;
  const message = `Message: ${notificationModels[0].body}`;
  const isNotRead: boolean = notificationModels.some(model => {
    return model.category === NotificationCategory.IN_APP && !model.is_read
  });
  const classes = accordionStyles();

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon = {<FontAwesomeIcon icon = {faChevronDown} color="black" size="sm"/>}
      >
        <Typography className={isNotRead ? classes.heading : classes.headingGray}>
          {dateString}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container className={classes.notificationBody}>
          <Typography color = "textSecondary">
            {message}
          </Typography>
          <Typography color = "textSecondary">
            {categoryString}
          </Typography>
        </Container>
      </AccordionDetails>
    </Accordion>
  )
}
