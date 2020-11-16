import React from "react";
import {useSelector} from "react-redux";
import {formStyles} from "../form.styles";
import {selectCovidTestToEdit} from "./covid_test.slice";
import {CovidTestInfo} from "../../model/covid_test";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CovidTestingCentre} from "../../model/covid_testing_centre";
import {selectAllCovidTestingCentres} from "./covid_testing_centre.slice";
import {MenuItem, Select, TextField, FormControl, InputLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "react-datepicker/dist/react-datepicker.css";
import {CovidStatus, toCovidStatus} from "../../model/covid_status";
import {Controller, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import DateFnsUtils from "@date-io/date-fns";
import {createCovidTestSchema, updateCovidTestSchema} from "./covid_test.schema";
import {Person, selectPersonState} from "../person/person.slice";
import {covidTestService} from "../../services/covid_test.service";
import {useHistory} from "react-router-dom";
import {testsRoute} from "../routes";

export interface CovidTestFormState {
  covid_testing_centre: CovidTestingCentre,
  test_time: Date,
  status: CovidStatus
}

export default function CovidTestForm(props: { [forCreation: string]: boolean }) {
  const covidTestToEdit: CovidTestInfo | undefined = useSelector(selectCovidTestToEdit);
  const forCreation: boolean = props.forCreation;
  const person: Person = useSelector(selectPersonState);
  const history = useHistory();
  const allCovidTestingCentres: CovidTestingCentre[] = useSelector(selectAllCovidTestingCentres);
  const formState: CovidTestFormState = {
    covid_testing_centre: allCovidTestingCentres[0],
    test_time: new Date(),
    status: CovidStatus.UNKNOWN
  };
  if (!props.forCreation) {
    formState.covid_testing_centre = allCovidTestingCentres.find((covidTestingCentre) => {
      return covidTestingCentre.covid_testing_centre_id === covidTestToEdit?.covid_testing_centre.covid_testing_centre_id;
    }) ?? formState.covid_testing_centre;
    formState.test_time = covidTestToEdit ? new Date(covidTestToEdit.covid_test.test_time) : formState.test_time;
    formState.status = toCovidStatus(covidTestToEdit?.covid_test.status);
  }
  const {handleSubmit, control, errors} = useForm({
    resolver: forCreation ? joiResolver(createCovidTestSchema) : joiResolver(updateCovidTestSchema),
    defaultValues: formState
  });
  console.log(errors);

  const classes = formStyles();

  const onSubmit = async (data: CovidTestFormState) => {
    if (forCreation) {
      await covidTestService.createCovidTest(person.person_id as number, data);
    } else {
      await covidTestService.updateCovidTest(person.person_id as number, data, covidTestToEdit?.covid_test.test_input_time as string);
    }
    history.push(testsRoute);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.container}>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Container className={classes.elementsContainer}>
            <Controller
              name = "covid_testing_centre"
              defaultValue={formState.covid_testing_centre}
              control={control}
              render={({ onChange, ...props }) => (
                <Autocomplete
                  options={allCovidTestingCentres}
                  defaultValue={formState.covid_testing_centre}
                  disabled={!forCreation}
                  getOptionLabel={option => option.name}
                  onChange={(e, data) => onChange(data)}
                  renderOption={option => (
                    <React.Fragment>
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={params => <TextField {...params} label="Covid Testing Centre" variant="outlined"/>}
                  {...props}
                />
              )}
            />
            {errors.test_time && <p>Test time is required</p>}
            <Controller
              control={control}
              name="test_time"
              defaultValue={formState.test_time}
              render={(props) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    disabled={!forCreation}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Covid Test Date"
                    value={props.value}
                    onChange={(date: MaterialUiPickersDate) => props.onChange(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              )}
            />
            {errors.test_time && <p>Test time is required</p>}
            <Controller
              render={(props) => (
                <FormControl>
                  <InputLabel id="test-status">Test Result</InputLabel>
                  <Select
                    labelId="test-status"
                    value={props.value}
                    onChange={(event) => props.onChange(event.target.value)}
                  >
                    <MenuItem value={CovidStatus.POSITIVE}>Positive</MenuItem>
                    <MenuItem value={CovidStatus.NEGATIVE}>Negative</MenuItem>
                    <MenuItem value={CovidStatus.UNKNOWN}>Unknown</MenuItem>
                  </Select>
                </FormControl>
              )}
              name="status"
              defaultValue={formState.status}
              control={control}
            />
            {errors.status && <p>When updating your test result, the updated status must be positive or negative.</p>}
            <Button
              fullWidth
              type="submit"
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