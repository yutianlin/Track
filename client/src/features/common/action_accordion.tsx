import React from "react";
import {accordionStyles} from "./accordion.styles";
import {Accordion, AccordionDetails, AccordionSummary, Button, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import "./action_accordion.css";

interface ScheduledClassProps {
  onActionClick: (scheduled_class_id: string) => any,
  id: any,
  actionButtonLabel: string,
  children: any,
  heading: string,
  secondaryHeading?: string,
}

export default function ActionAccordion({onActionClick, id, actionButtonLabel, children, heading, secondaryHeading}: ScheduledClassProps) {
  const accordionClasses = accordionStyles();

  return (
    <Accordion className={accordionClasses.root}>
      <AccordionSummary
        className = {accordionClasses.actionContainer}
        expandIcon = {<FontAwesomeIcon icon = {faChevronDown} color="black" size="sm"/>}
      >
        <Typography className={accordionClasses.heading}>
          {heading}
        </Typography>
        {secondaryHeading && (<Typography className={accordionClasses.secondaryHeading}>
          {secondaryHeading}
        </Typography>
        )}
        <div className = {accordionClasses.actionContainer}>
          <Button onClick={(event) => {
            event.stopPropagation();
            onActionClick(id)
          }}>
            {actionButtonLabel}
          </Button>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Container className={accordionClasses.notificationBody}>
          {children}
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}
