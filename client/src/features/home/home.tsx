import React from "react";
import {useSelector} from "react-redux";
import {selectPersonState} from "../person/person.slice";
import './home.css';

export default function Home() {
  const person = useSelector(selectPersonState);

  return (
    <div className = "hello">
      <h1>Welcome {person.name}!</h1>
    </div>
  )
}
