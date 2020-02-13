import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  datePicker: {
    width: 190,
    '& fieldset': {
      marginTop: 5,
      height: 48,
      border: '1px solid #303269'
    },
    '& input': {
      color: '#666',
      fontSize: 14
    },
    '& div.Mui-focused': {
      '& fieldset': {
        borderWidth: '1px !important',
        borderColor: '#303269 !important'
      }
    }
  },
  daysSelect: {
    '& .MuiSelect-outlined': {
      display: 'flex',
      alignItems: 'center',
      width: 257,
      height: 43,
      marginBottom: 1,
      border: '1px solid #303269',
      padding: '0 10px',
      color: '#666',
      fontSize: 14,
      fontWeight: 400,
      '&:focus': {
        background: 0,
        borderRadius: 5
      },
      '&:active': {
        border: '1px solid #303269'
      }
    }
  },
  menuItem: {
    textAlign: 'center',
    color: '#666',
    fontWeight: 500,
    fontSize: 14,
    '&:hover': {
      color: '#304269',
      fontWeight: 600,
      background: 'none'
    }
  }
});

export default useStyles;
