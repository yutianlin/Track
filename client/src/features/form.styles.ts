import {makeStyles} from "@material-ui/core/styles";

export const formStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10vh",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  elementsContainer: {
    display: 'flex',
    flexDirection: 'column'
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