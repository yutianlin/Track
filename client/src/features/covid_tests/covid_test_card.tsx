import {CovidTest, CovidTestInfo} from "../../model/covid_test";
import {Button, Card, CardActions, CardContent, Container, Typography} from "@material-ui/core";
import {editTestRoute} from "../routes";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {formatAddress, formatMoment, isPresent} from "../../util";
import {CovidTestingCentre} from "../../model/covid_testing_centre";
import {cardStyles} from "../common/card.styles";
import "./covid_test_card.css";
import { useHistory } from "react-router-dom";
import moment from 'moment-timezone';
import {useDispatch} from "react-redux";
import {setCovidTestToEdit} from "./covid_test.slice";

export default function CovidTestCard(props: { [covidTestInfo: string]: CovidTestInfo }) {
  const classes = cardStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const covidTest: CovidTest = props.covidTestInfo.covid_test;
  const covidTestingCentre: CovidTestingCentre = props.covidTestInfo.covid_testing_centre;
  let circleColor: string;
  if (isPresent(covidTest.status)) {
    circleColor = covidTest.status ? "#ff0000" : "#07da63";
  } else {
    circleColor = "#d3d3d3"
  }

  const redirect = () => {
    dispatch(setCovidTestToEdit(props.covidTestInfo))
    history.push(editTestRoute);
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
              Test Date: {formatMoment(moment(covidTest.test_time))}
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
            <Button onClick={redirect} size = "large" className = {classes.editButton} variant="outlined">Update</Button>
          </CardActions>
        </CardContent>
      </Card>
    </Container>
  );
}