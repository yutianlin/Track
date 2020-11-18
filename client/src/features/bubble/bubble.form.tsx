import React from "react";
import {Person, selectPersonState} from "../person/person.slice";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {createBubbleSchema} from "./bubble.schema";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {formStyles} from "../form.styles";
import {useHistory} from "react-router";
import {bubbleService} from "../../services/bubble.service";
import {bubbleLandingRoute} from "../routes";

export default function BubbleForm() {
  const personState: Person = useSelector(selectPersonState);
  const classes = formStyles();
  const {register, handleSubmit, errors} = useForm({
    resolver: joiResolver(createBubbleSchema)
  });
  const history = useHistory();

  const onSubmit = async (data: any) => {
    const createdBubble = await bubbleService.createBubble(data);
    await bubbleService.createPersonBubble(personState.person_id as number, createdBubble.bubble_id);
    history.push(bubbleLandingRoute);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.container}>
        <h3>Create a Bubble</h3>
        <form className={classes.form} noValidate
              onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            autoComplete="off"
            fullWidth
            label="Title"
            name="title"
          />
          {errors.title && <p>Title is required.</p>}
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            inputRef={register}
            fullWidth
            required
            label="Description"
            name="description"
          />
          {errors.description && <p>Description is required.</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Bubble
          </Button>
        </form>
      </div>
    </Container>
  );
}