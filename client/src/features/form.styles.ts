import {makeStyles} from "@material-ui/core/styles";

export const formStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(20),
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