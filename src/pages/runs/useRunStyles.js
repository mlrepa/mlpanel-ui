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
  modalPaper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: '35%',
    left: '35%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  chip: {
    maxWidth: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2)
  },
  topBlock: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: theme.spacing(3)
  },
  item: {
    margin: theme.spacing(2)
  }
}));

export default useStyles;
