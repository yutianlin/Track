import {useEffect, useState} from "react";
import {CovidTestInfo} from "../../model/covid_test";
import React from 'react';
import {covidTestService} from "../../services/covid_test.service";
import {Person, selectPersonState} from "../person/person.slice";
import {useSelector} from "react-redux";
import CovidTestCard from "./covid_test_card";
import "./covid_test_landing_page.css";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {LinkContainer} from "react-router-bootstrap";
import {createTestRoute} from "../routes";

export default function CovidTestLandingPage() {
  const [tests, setTests]: [CovidTestInfo[], any] = useState([]);
  const personState: Person = useSelector(selectPersonState);

  useEffect(() => {
    covidTestService.getAllCovidTestsForUser(personState.person_id as number)
      .then((covidTestInfos: CovidTestInfo[]) => {
        setTests(covidTestInfos);
      });
  }, []);
  const covidTestCards: any = tests.map(test => {
    return <div key={test.covid_test.test_time.toISOString()}>
      <CovidTestCard covidTestInfo={test}/>
    </div>
  });

  return (
    <div className="covid-test-landing-page">
      {covidTestCards}
      <LinkContainer style={{cursor: "pointer"}} to = {createTestRoute}>
        <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
      </LinkContainer>
    </div>
  )
}
