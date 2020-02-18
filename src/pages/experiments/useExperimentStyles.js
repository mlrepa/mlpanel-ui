import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 350
    }
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  chip: {
    margin: theme.spacing(2)
  },
  topBlock: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: theme.spacing(3)
  }
}));

export default useStyles;
