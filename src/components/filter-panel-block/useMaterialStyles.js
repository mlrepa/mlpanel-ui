import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  item: {
    '& ::before': {
      display: 'none'
    }
  }
});

export default useStyles;
