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
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../login/login.slice";
import Joi from "joi";
import {selectPersonState} from "./person.slice";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'black'
  },
}));

const maxNumberLength = Number.MAX_SAFE_INTEGER.toString().length - 1;
const numberRegex = /^\d+$/;
const createPersonSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ tlds: {allow: false} }).allow(null, ""),
  phone_number: Joi.string().regex(numberRegex).allow(null, ""),
  in_app_notification: Joi.boolean().required(),
  // Note we convert to string because React Hook form treats empty form as "" and it will complain
  student_id: Joi.string().max(maxNumberLength).pattern(numberRegex).allow(""),
  faculty_id: Joi.string().max(maxNumberLength).pattern(numberRegex).allow( ""),
  job_title: Joi.string().min(1).when('faculty_id',
    {is: Joi.string(), then: Joi.required(), otherwise: Joi.allow("")})
});

export default function PersonForm() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const personState = useSelector(selectPersonState);
  const classes = useStyles();
  // Use joi to validate here as well
  const {register, handleSubmit, control, watch, errors} = useForm({
    resolver: joiResolver(createPersonSchema),
    defaultValues: {
      name: personState.name ?? "",
      email: personState.email ?? "",
      phone_number: personState.phoneNumber ?? null,
      in_app_notification: personState.inAppNotification,
      student_id: personState.studentId?.toString() ?? "",
      faculty_id: personState.facultyId?.toString() ?? "",
      job_title: personState.jobTitle ?? ""
    }
  })
  console.log(errors);
  // watch changes for faculty number and show job title if they input
  const facultyNumberWatch = watch("faculty_id");
  const isFacultyNumberFilledOut = facultyNumberWatch !== "";

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <form className={classes.form} noValidate
              onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
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
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            fullWidth
            label="email (opt)"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            fullWidth
            label="phone number (opt)"
            name="phone_number"
            autoComplete="tel"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            fullWidth
            label="student number (opt)"
            name="student_id"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            fullWidth
            label="faculty number (opt)"
            name="faculty_id"
          />
          {
            isFacultyNumberFilledOut && (
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register}
                fullWidth
                label="job title (opt)"
                name="job_title"
              />
            )
          }
          <FormControlLabel
            control={
              <Controller as={Checkbox} control={control} name="in_app_notification" color="primary"
                          defaultValue={true}/>}
            label="In-App Notifications?"
          />
          {errors.name && <p>Name is required.</p>}
          {errors.faculty_id && <p>{errors.faculty_id.message}</p>}
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
