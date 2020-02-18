import { withStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';

const CustomizedSelect = withStyles(theme => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    width: 150,
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#ffffff',
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper
    }
  }
}))(InputBase);

export default CustomizedSelect;
