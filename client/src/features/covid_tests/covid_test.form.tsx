import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {formStyles} from "../form.styles";
import {selectCovidTestToEdit} from "./covid_test.slice";
import {CovidTestInfo} from "../../model/covid_test";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CovidTestingCentre} from "../../model/covid_testing_centre";
import {selectAllCovidTestingCentres} from "./covid_testing_centre.slice";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {cloneAndUpdateAttribute, isPresent} from "../../util";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {CovidStatus, toCovidStatus} from "../../model/covid_status";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {createPersonSchema} from "../person/person.schema";

interface CovidTestFormState {
  covidTestingCentre?: CovidTestingCentre,
  testDate: Date,
  status?: CovidStatus
}

interface CovidTestFormError {
  covidTestingCentre?: string,
  testDate?: string,
  status?: string
}

export default function CovidTestForm(props: {[forCreation: string]: boolean}) {
  const covidTestToEdit: CovidTestInfo | undefined = useSelector(selectCovidTestToEdit);
  const allCovidTestingCentres: CovidTestingCentre[] = useSelector(selectAllCovidTestingCentres);
  const formState: CovidTestFormState = {
    testDate: new Date()
  };
  if (!props.forCreation) {
    formState.covidTestingCentre = allCovidTestingCentres.find((covidTestingCentre) => {
      return covidTestingCentre.covid_testing_centre_id === covidTestToEdit?.covid_testing_centre.covid_testing_centre_id;
    });
    formState.testDate = covidTestToEdit ? new Date(covidTestToEdit.covid_test.test_time) : formState.testDate;
    formState.status = toCovidStatus(covidTestToEdit?.covid_test.status);
  }
  const {register, handleSubmit, control, watch, errors} = useForm({
    resolver: joiResolver(createPersonSchema),
    defaultValues: formState
  });

  const [state, setState]: [CovidTestFormState, any] = useState(formState);
  const [error, setError]: [CovidTestFormError, any] = useState({});
  const dispatch = useDispatch();
  const classes = formStyles();

  const updateError = (key: keyof CovidTestFormError, value: any) => {
    setError(cloneAndUpdateAttribute(error, key, value));
  }

  const updateState = (key: keyof CovidTestFormState, value: any) => {
    setState(cloneAndUpdateAttribute(state, key, value));
  }

  const validate = (): boolean => {
    let isValid = true;
    if (!isPresent(state.covidTestingCentre)) {
      updateError("covidTestingCentre", "Covid testing centre is required");
      isValid = false;
    } else {
      updateError("covidTestingCentre", "");
    }

    if (!isPresent(state.testDate)) {
      updateError("testDate", "Test date is required");
      isValid = false;
    } else {
      updateError("testDate", "");
    }

    return isValid;
  }

  const onSubmit = async () => {
    const isValid: boolean = validate();
    if (isValid) {

    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.container}>
        <form className={classes.form} noValidate>
          <Container className={classes.elementsContainer}>
            <Autocomplete
              options={allCovidTestingCentres}
              disabled={!props.forCreation}
              defaultValue={state.covidTestingCentre}
              getOptionLabel={option => option.name}
              onChange={(event: any, covidCentre: CovidTestingCentre | null) => updateState("covidTestingCentre", covidCentre)}
              renderOption={option => (
                <React.Fragment>
                  {option.name}
                </React.Fragment>
              )}
              renderInput={params => <TextField {...params} label="Covid Testing Centre" variant="outlined" />}
            />
            {error.covidTestingCentre && <p>{error.covidTestingCentre}</p>}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                disabled={!props.forCreation}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="Covid Test Date"
                value={state.testDate}
                onChange={(date: MaterialUiPickersDate) => updateState("testDate", date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            {error.testDate && <p>{error.testDate}</p>}
            <FormControl>
              <InputLabel id="test-status">Status (opt)</InputLabel>
              <Select
                value={state.status}
                labelId="test-status"
                onChange={event => updateState("status", "true" === event.target.value)}>
                <MenuItem value={CovidStatus.POSITIVE}>Positive</MenuItem>
                <MenuItem value={CovidStatus.NEGATIVE}>Negative</MenuItem>
                <MenuItem value={CovidStatus.UNKNOWN}>Unknown</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={onSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              {props.forCreation ? "Create" : "Update"}
            </Button>
          </Container>
        </form>
      </div>
    </Container>)
}