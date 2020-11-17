import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchPerson, selectIsLoggedIn, appLoaded, selectIsAppLoading} from "./features/login/login.slice";
import PersonForm from "./features/person/person.form";
import {CookieService} from "./services/cookie.service";
import NavBar from "./features/nav/navbar";
import {Redirect, Route, Switch} from "react-router";
import Home from "./features/home/home";
import {
  bikeRoute, bubbleLandingRoute, createBubbleRoute,
  createTestRoute,
  editPersonRoute,
  editTestRoute,
  homeRoute, notificationsRoute,
  personInfoRoute, scheduledClassesRoute,
  testsRoute
} from "./features/routes";
import Bike from "./features/bike/bike";
import {fetchBikes} from "./features/bike/bike.slice";
import PersonCard from "./features/person/person.card";
import {fetchCovidTestingCentres} from "./features/covid_tests/covid_testing_centre.slice";
import CovidTestLandingPage from "./features/covid_tests/covid_test_landing_page";
import CovidTestForm from "./features/covid_tests/covid_test.form";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationsPage from "./features/notification/notifications_page";
import ScheduledClassesPage from "./features/scheduled_class/scheduled_classes";
import BubblePage from "./features/bubble/bubble_page";
import BubbleForm from "./features/bubble/bubble.form";

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!isAppLoading && !isLoggedIn && <PersonForm/>}
      {!isAppLoading && isLoggedIn && (
        <Switch>
          <Route exact path = '/' component={Home}/>
          <Route path = {homeRoute} component={Home}/>
          <Route path = {editPersonRoute} component={PersonForm}/>
          <Route path = {bikeRoute} component={Bike}/>
          <Route path = {personInfoRoute} component={PersonCard}/>
          <Route path = {testsRoute} component={CovidTestLandingPage}/>
          <Route path = {notificationsRoute} component={NotificationsPage}/>
          <Route path = {scheduledClassesRoute} component={ScheduledClassesPage}/>
          <Route path = {bubbleLandingRoute} component={BubblePage}/>
          <Route path = {createBubbleRoute} component={BubbleForm}/>
          <Route path = {createTestRoute} render={()=> <CovidTestForm forCreation={true}/>}/>
          <Route path = {editTestRoute} render={()=> <CovidTestForm forCreation={false}/>}/>
          <Redirect to={homeRoute}/>
        </Switch>
      )}
    </div>
  );
}
