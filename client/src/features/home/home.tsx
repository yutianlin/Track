import React from "react";
import {useSelector} from "react-redux";
import {selectPersonState} from "../person/person.slice";
import './home.css';
import EntranceInput from "./entrance_input";
import {Container} from "@material-ui/core";

export default function Home() {
  const person = useSelector(selectPersonState);

  return (
    <Container className = "hello">
      <h1 className = "welcome-message">Welcome {person.name}!</h1>
      <h1>You are {person.person_status}</h1>
      <EntranceInput/>
    </Container>
  )
}
