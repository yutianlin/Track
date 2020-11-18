import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {joiResolver} from '@hookform/resolvers/joi';
import Container from '@material-ui/core/Container';
import {useForm, Controller} from 'react-hook-form'
import {useDispatch, useSelector} from "react-redux";
import {login, selectIsLoggedIn} from "../login/login.slice";
import {Person, selectPersonState, setPerson} from "./person.slice";
import {createPersonSchema} from "./person.schema";
import {isStringEmpty} from "../../util";
import {personService} from "../../services/person.service";
import {CookieService} from "../../services/cookie.service";
import {formStyles} from "../form.styles";
import {useHistory} from "react-router";
import {personInfoRoute} from "../routes";

export default function PersonForm() {
  const [remoteError, setRemoteError] = useState("");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const personState = useSelector(selectPersonState);
  const classes = formStyles();
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
  const isFacultyNumberFilledOut = !isStringEmpty(watch("faculty_id"));

  const onSubmit = async (person: Person) => {
    try {
      if (!isLoggedIn) {
        const createdPerson = await personService.createPerson(person);
        CookieService.setPersonId(createdPerson.person_id as number);
        dispatch(setPerson(createdPerson));
        dispatch(login());
      } else {
        const updatedPerson = await personService.updatePerson(personState.person_id as number, person);
        dispatch(setPerson(updatedPerson));
        history.push(personInfoRoute);
      }
    } catch (error) {
      setRemoteError(error.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.container}>
        <h3>{isLoggedIn ? "Edit Info" : "Create an Account"}</h3>
        <form className={classes.form} noValidate
              onSubmit={handleSubmit(onSubmit)}>
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
          <Controller name="in_app_notification" control={control} render={(props) => (
            <div>
              <Checkbox
                className="input"
                onChange={(event) => props.onChange(event.target.checked)}
                checked={props.value}
              />
              <label>In-App Notifications?</label>
            </div>
          )}/>
          {errors.in_app_notification && <p>{errors.in_app_notification.message}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoggedIn ? "Update" : "Sign Up"}
          </Button>
          {remoteError && <p>Please ensure that you have at least one active notification setting.</p>}
        </form>
      </div>
    </Container>
  );
}
