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
import moment from "moment-timezone";

export default function CovidTestLandingPage() {
  const [tests, setTests]: [CovidTestInfo[], any] = useState([]);
  const [isLoading, setIsLoading]: [boolean, any] = useState(true);
  const personState: Person = useSelector(selectPersonState);

  useEffect(() => {
    covidTestService.getAllCovidTestsForUser(personState.person_id as number)
      .then((covidTestInfos: CovidTestInfo[]) => {
        setIsLoading(false);
        setTests(covidTestInfos);
      });
  }, []);

  tests.sort((testA: CovidTestInfo, testB: CovidTestInfo) => {
    return moment(testB.covid_test.test_time).isAfter(testA.covid_test.test_time) ? 1 : -1;
  });
  const covidTestCards: any = tests.map((test: CovidTestInfo, index: number) => {
    return <div key={index}>
      <CovidTestCard covidTestInfo={test}/>
    </div>
  });

  if (isLoading) {
    return <div/>
  }

  return (
    <div className="covid-test-landing-page">
      {covidTestCards}
      <LinkContainer style={{cursor: "pointer"}} to = {createTestRoute}>
        <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
      </LinkContainer>
    </div>
  )
}
