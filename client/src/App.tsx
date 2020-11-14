import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchPerson, selectIsLoggedIn, appLoaded, selectIsAppLoading} from "./features/login/login.slice";
import PersonForm from "./features/person/person.form";
import {CookieService} from "./services/cookie.service";
import NavBar from "./features/nav/navbar";
import {Redirect, Route, Switch} from "react-router";
import Home from "./features/home/home";
import {bikeRoute, editPersonRoute, homeRoute, personInfoRoute, testsRoute} from "./features/routes";
import Bike from "./features/bike/bike";
import {fetchBikes} from "./features/bike/bike.slice";
import PersonCard from "./features/person/person.card";
import {fetchCovidTestingCentres} from "./features/covid_tests/covid_testing_centre.slice";
import CovidTestLandingPage from "./features/covid_tests/covid_test_landing_page";

export default function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAppLoading = useSelector(selectIsAppLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const personId: string | undefined = CookieService.getPersonId();
    if (personId) {
      dispatch(fetchPerson(personId));
    } else {
      dispatch(appLoaded());
    }
    dispatch(fetchBikes());
    dispatch(fetchCovidTestingCentres());
  }, []);

  return (
    <div>
      <NavBar/>
      {!isAppLoading && !isLoggedIn && <PersonForm/>}
      {!isAppLoading && isLoggedIn && (
        <Switch>
          <Route exact path = '/' component={Home}/>
          <Route path = {homeRoute} component={Home}/>
          <Route path = {editPersonRoute} component={PersonForm}/>
          <Route path = {bikeRoute} component={Bike}/>
          <Route path = {personInfoRoute} component={PersonCard}/>
          <Route path = {testsRoute} component={CovidTestLandingPage}/>
          <Redirect to={homeRoute}/>
        </Switch>
      )}
    </div>
  );
}
