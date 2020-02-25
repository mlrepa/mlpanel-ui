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
    maxWidth: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2)
  },
  topBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4)
  },
  innerBlock: {
    display: 'flex'
  },
  button: {
    marginLeft: theme.spacing(3)
  },
  item: {
    margin: theme.spacing(2)
  }
}));

export default useStyles;
