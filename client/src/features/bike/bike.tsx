import {useEffect, useState} from "react";
import React from "react";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Person, selectPersonState} from "../person/person.slice";
import {personBikeService} from "../../services/person.bike.service";
import {PersonBike} from "../../model/person.bike";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {formStyles} from "../form.styles";
import BikeLog from "./bike.log";
import {selectAllBikes} from "./bike.slice";
import {isStringEmpty} from "../../util";

export default function Bike() {
  const [history, setHistory]: [PersonBike[], any] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const rentableBikes: string[] = useSelector(selectAllBikes);
  const personState: Person = useSelector(selectPersonState);
  const classes = formStyles();
  const {register, handleSubmit, errors} = useForm({
    defaultValues: {
      shared_bike_id: ""
    }
  });

  useEffect(() => {
    personBikeService.getBikeRentalsByPersonId(personState.person_id as number)
      .then((sharedBikes: PersonBike[]) => {
        setHistory(sharedBikes);
      });
  }, []);

  const onSubmit = async (bike: { [shared_bike_id: string]: string }) => {
    if (!rentableBikes.includes(bike.shared_bike_id)) {
      setErrorMessage("The bike number does not exist");
    } else {
      try {
        const personBike: PersonBike = await personBikeService.createPersonBike(
          personState.person_id as number,
          bike.shared_bike_id);

        const newHistory = history.slice();
        newHistory.unshift(personBike);
        setHistory(newHistory);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("The bike is not available to rent.");
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.container}>
        <h3>Bikes</h3>
        <form className={classes.form} noValidate
              onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({
              minLength: 1,
              required: true
            })}
            required
            fullWidth
            label="Bike number"
            name="shared_bike_id"
          />
          {errors.shared_bike_id && (<p>Bike number is required.</p>)}
          {!isStringEmpty(errorMessage) && !errors.shared_bike_id && (<p>{errorMessage}</p>)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Check-In
          </Button>
        </form>
      </div>
      <BikeLog bikeHistories={history}/>
    </Container>
  );
}