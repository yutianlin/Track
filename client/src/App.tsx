import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchPerson, selectIsLoggedIn, appLoaded, selectIsAppLoading} from "./features/login/login.slice";
import PersonForm from "./features/person/person.form";
import {CookieService} from "./services/cookie.service";
import NavBar from "./features/nav/navbar";
import {Route, Switch} from "react-router";
import Home from "./features/home/home";
import {bikeRoute, editPersonRoute, homeRoute} from "./features/routes";
import Bike from "./features/bike/bike";
import {fetchBikes} from "./features/bike/bike.slice";


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
        </Switch>
      )}
    </div>
  );
}
