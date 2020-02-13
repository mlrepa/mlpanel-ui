import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { CookiesProvider } from 'react-cookie';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import history from './history';
import routes from './routes';

import configureStore from './configureStore';

const store = configureStore({});

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: { backgroundColor: '#304269' }
    },
    MuiPickersCalendarHeader: {
      switchHeader: {}
    },
    MuiPickersDay: {
      day: {
        color: '#304269'
      },
      daySelected: {
        backgroundColor: '#304269'
      },
      dayDisabled: {},
      current: {
        color: '#304269'
      }
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#304269'
      }
    }
  }
});

const Root = () => (
  <Provider store={store}>
    <CookiesProvider>
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ConnectedRouter history={history}>
            <>
              <Switch>
                {routes.map(item => (
                  <Route
                    key={item.id}
                    exact={item.exact}
                    path={item.path}
                    component={item.component}
                  />
                ))}
              </Switch>
            </>
          </ConnectedRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </CookiesProvider>
  </Provider>
);

export default Root;
