import {makeStyles} from "@material-ui/core/styles";

// from https://material-ui.com/components/accordion/
export const accordionStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  root: {
    width: '35vw'
  },
  headingGray: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  notificationBody: {
    display: 'flex',
    flexDirection: 'column'
  },
  actionContainer: {
    display: 'flex',
    marginLeft: 'auto'
  }
}));