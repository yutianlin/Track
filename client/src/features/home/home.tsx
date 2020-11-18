import React from "react";
import {useSelector} from "react-redux";
import {selectPersonState} from "../person/person.slice";
import './home.css';
import EntranceInput from "./entrance_input";
import {Container} from "@material-ui/core";
import {CovidStatus} from "../../model/covid_status";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const person = useSelector(selectPersonState);

  let greeting;
  let circleColor;
  let statusMessage = "You are: ";
  switch (person.person_status) {
    case CovidStatus.POSITIVE:
      greeting = `Stay home ${person.name}!`;
      circleColor = "#ff0000";
      break;
    case CovidStatus.INFECTED:
      greeting = `Be careful ${person.name}!`;
      statusMessage = `You had an exposure and are: `
      circleColor = "#f8d354";
      break;
    default:
      greeting = `Welcome ${person.name}!`;
      circleColor = "#07da63";
      break;
  }

  return (
    <Container className = "hello">
      <h1 className = "welcome-message">{greeting}</h1>
      <div style = {{display: "flex", alignItems: "center"}}>
        <h1 style={{marginRight: "10px"}}>{statusMessage}</h1>
        <FontAwesomeIcon icon = {faCircle} color={circleColor} size="2x"/>
      </div>
      <EntranceInput/>
    </Container>
  )
}
