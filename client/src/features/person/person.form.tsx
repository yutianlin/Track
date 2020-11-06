import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { joiResolver } from '@hookform/resolvers/joi';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm, Controller} from 'react-hook-form'
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoggedIn} from "../login/login.slice";
import {createPerson, selectPersonState} from "./person.slice";
import {createPersonSchema} from "./person.schema";
import {create} from "domain";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'black'
  },
}));

export default function PersonForm() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const personState = useSelector(selectPersonState);
  const classes = useStyles();
  // Use joi to validate here as well
  const {register, handleSubmit, control, watch, errors} = useForm({
    resolver: joiResolver(createPersonSchema),
    defaultValues: {
      name: personState.name ?? "",
      email: personState.email ?? "",
      phone_number: personState.phone_number ?? "",
      in_app_notification: personState.in_app_notification,
      student_id: personState.student_id ?? "",
      faculty_id: personState.faculty_id ?? "",
      job_title: personState.job_title ?? ""
    }
  });
  // watch changes for faculty number and show job title if they input
  const isFacultyNumberFilledOut = watch("faculty_id") !== "";

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <form className={classes.form} noValidate
              onSubmit={handleSubmit((data) => dispatch(createPerson(data)))}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            label="name"
            name="name"
            autoComplete="name"
          />
          {errors.name && <p>Name is required.</p>}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            fullWidth
            label="email (opt)"
            name="email"
            autoComplete="email"
          />
          {errors.email && <p>Email was invalid.</p>}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            fullWidth
            label="phone number (opt)"
            name="phone_number"
            autoComplete="tel"
          />
          {errors.phone_number && <p>Phone number format was invalid. Proper format: 123456789.</p>}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            fullWidth
            label="student number (opt)"
            name="student_id"
          />
          {errors.student_id && <p>Student number was invalid.</p>}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            fullWidth
            label="faculty number (opt)"
            name="faculty_id"
          />
          {errors.faculty_id && <p>Faculty number was invalid.</p>}
          {
            isFacultyNumberFilledOut && (
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  inputRef={register}
                  fullWidth
                  label="job title (opt)"
                  name="job_title"
                />
                {errors.job_title && <p>Job title must be filled if faculty number is.</p>}
              </div>
            )
          }
          <FormControlLabel
            control={
              <Controller as={Checkbox} control={control} name="in_app_notification" color="primary"/>}
            label="In-App Notifications?"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoggedIn ? "Update": "Sign Up"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
