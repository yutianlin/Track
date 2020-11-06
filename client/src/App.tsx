import React, {useEffect} from 'react';
import './App.css';
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux";
import {fetchPerson, selectIsLoggedIn, appLoaded} from "./features/login/login.slice";
import {selectPersonState} from "./features/person/person.slice";
import PersonForm from "./features/person/person.form";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const person = useSelector(selectPersonState);
  const dispatch = useDispatch();

  useEffect(() => {
    const personId: any = Cookies.get("xd");
    if (personId) {
      dispatch(fetchPerson(personId));
    } else {
      dispatch(appLoaded())
    }
  }, []);

  return (
    <div>
      {isLoggedIn && <p>Hi {person.name}</p>}
      <PersonForm />
    </div>
  );
}

export default App;
