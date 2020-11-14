import {CovidTest, CovidTestInfo} from "../../model/covid_test";
import {Button, Card, CardActions, CardContent, Container, Typography} from "@material-ui/core";
import {LinkContainer} from "react-router-bootstrap";
import {editTestRoute} from "../routes";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {formatMoment, isPresent} from "../../util";
import {CovidTestingCentre, formatAddress} from "../../model/covid_testing_centre";
import {cardStyles} from "../common/card.styles";
import "./covid_test_card.css";

export default function CovidTestCard(props: { [covidTestInfo: string]: CovidTestInfo }) {
  const classes = cardStyles();
  const covidTest: CovidTest = props.covidTestInfo.covid_test;
  const covidTestingCentre: CovidTestingCentre = props.covidTestInfo.covid_testing_centre;
  let circleColor: string;
  if (isPresent(covidTest.status)) {
    circleColor = covidTest.status ? "#ff0000" : "#07da63";
  } else {
    circleColor = "#d3d3d3"
  }

  return (
    <Container className="covid-test-card-container">
      <Card className={classes.root}>
        <CardContent className = {classes.center}>
          <FontAwesomeIcon icon = {faCircle} color={circleColor} size="2x"/>
          <Container className = {classes.titleContainer}>
            <Typography variant="h5">
              Covid-Test
            </Typography>
            <Typography
              className = {`${classes.body} ${classes.testingCentreName}`} color = "textSecondary">
              {covidTestingCentre.name}
            </Typography>
          </Container>
          <Container>
            <Typography
              className = {classes.body} color = "textSecondary">
              Test Date: {formatMoment(covidTest.test_time)}
            </Typography>
            <Typography
              className = {classes.body} color = "textSecondary">
              Centre Id: {covidTestingCentre.covid_testing_centre_id}
            </Typography>
            <Typography
              className = {classes.body} color = "textSecondary">
              Address: {formatAddress(covidTestingCentre)}
            </Typography>
          </Container>
          <CardActions>
            <LinkContainer to={{pathname: editTestRoute, state: covidTest}}>
              <Button size = "large" className = {classes.editButton} variant="outlined">Update</Button>
            </LinkContainer>
          </CardActions>
        </CardContent>
      </Card>
    </Container>
  );
}