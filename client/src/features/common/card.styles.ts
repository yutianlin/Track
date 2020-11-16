import {makeStyles} from "@material-ui/core/styles";

export const cardStyles = makeStyles((theme) => ({
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
  titleContainer: {
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  testingCentreName: {
    textAlign: "center"
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    fontSize: 14,
    marginBottom: theme.spacing(1),
    whiteSpace: "pre-line"
  },
  editButton: {
    marginTop: theme.spacing(3)
  },
}));