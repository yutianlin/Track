import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import React from "react";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../login/login.slice";
import {Button} from "@material-ui/core";
import {selectPersonState} from "../person/person.slice";
import {editPersonRoute, homeRoute} from "../routes";
import "./navbar.css";

export default function NavBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const person = useSelector(selectPersonState);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand className="mr-auto" href={homeRoute}>TRACK</Navbar.Brand>
        {isLoggedIn && (
          <Nav className = "navbar-links">
            <Nav.Link href={homeRoute}>Bubble</Nav.Link>
            <Nav.Link href={homeRoute}>Tests</Nav.Link>
            <Nav.Link href={homeRoute}>Bike</Nav.Link>
            <Nav.Link href={homeRoute}>Class</Nav.Link>
            <Nav.Link href={homeRoute}>Notifications</Nav.Link>
          </Nav>
        )}
        {isLoggedIn && (
          <Nav className="ml-auto">
            <Button className="personButton" variant="outlined" href={editPersonRoute}>{person.name}</Button>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
