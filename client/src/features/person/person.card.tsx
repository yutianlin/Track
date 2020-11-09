import {useSelector} from "react-redux";
import {selectPersonState} from "./person.slice";
import React from 'react';
import {Button, Card, CardActions, CardContent, Container, Typography} from "@material-ui/core";
import {LinkContainer} from "react-router-bootstrap";
import {editPersonRoute} from "../routes";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    padding: '1vh 1vw'
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "15vh"
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  body: {
    fontSize: 14,
    marginBottom: theme.spacing(1)
  },
  editButton: {
    marginTop: theme.spacing(3)
  }
}));

export default function PersonCard() {
  const classes = useStyles();
  const personState = useSelector(selectPersonState);

  return (
    <Container className={classes.cardContainer}>
      <Card className={classes.root}>
        <CardContent className = {classes.center}>
          <Typography className = {classes.title} variant="h5">{personState.name}</Typography>
          <Container>
            {personState.phone_number && (<Typography className = {classes.body} color = "textSecondary">Number: {personState.phone_number}</Typography>)}
            {personState.email && (<Typography className = {classes.body} color = "textSecondary">Email: {personState.email}</Typography>)}
            {personState.student_id && (<Typography className = {classes.body} color = "textSecondary">Student Number: {personState.student_id}</Typography>)}
            {personState.faculty_id && (<Typography className = {classes.body} color = "textSecondary">Faculty Number: {personState.faculty_id}</Typography>)}
            {personState.job_title && (<Typography className = {classes.body} color = "textSecondary">Job Title: {personState.job_title}</Typography>)}
            <Typography className = {classes.body} color = "textSecondary">Notification: {personState.in_app_notification ? "On" : "Off"}</Typography>
          </Container>
          <CardActions>
            <LinkContainer to={editPersonRoute}>
              <Button size = "large" className = {classes.editButton} variant="outlined">Edit</Button>
            </LinkContainer>
          </CardActions>
        </CardContent>
      </Card>
    </Container>
  );
}