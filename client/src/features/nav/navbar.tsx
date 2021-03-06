import {Nav, Navbar} from "react-bootstrap";
import React from "react";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../login/login.slice";
import {Button} from "@material-ui/core";
import {selectPersonState} from "../person/person.slice";
import {
  bikeRoute,
  bubbleLandingRoute,
  homeRoute,
  notificationsRoute,
  personInfoRoute,
  scheduledClassesRoute, statsRoute,
  testsRoute
} from "../routes";
import "./navbar.css";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const person = useSelector(selectPersonState);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <LinkContainer to={homeRoute}>
          <Navbar.Brand className="mr-auto">TRACK</Navbar.Brand>
        </LinkContainer>
        {isLoggedIn && (
          <Nav className = "navbar-links">
            <LinkContainer to={bubbleLandingRoute}>
              <Nav.Link>Bubble</Nav.Link>
            </LinkContainer>
            <LinkContainer to={testsRoute}>
              <Nav.Link>Tests</Nav.Link>
            </LinkContainer>
            <LinkContainer to={bikeRoute}>
              <Nav.Link>Bike</Nav.Link>
            </LinkContainer>
            <LinkContainer to={scheduledClassesRoute}>
              <Nav.Link>Class</Nav.Link>
            </LinkContainer>
            <LinkContainer to={notificationsRoute}>
              <Nav.Link>Notifications</Nav.Link>
            </LinkContainer>
            <LinkContainer to={statsRoute}>
              <Nav.Link>Stats</Nav.Link>
            </LinkContainer>
          </Nav>
        )}
        {isLoggedIn && (
          <Nav className="ml-auto">
            <LinkContainer to={personInfoRoute}>
              <Button className="personButton" variant="outlined">{person.name}</Button>
            </LinkContainer>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
