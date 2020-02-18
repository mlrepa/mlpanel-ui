import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import ReduxToastr from 'react-redux-toastr';

import Layout from 'components/layout';

import history from './history';
import routes from './routes';

import store from './configureStore';

const materialTheme = createMuiTheme({
  overrides: {}
});

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ConnectedRouter history={history}>
          <Layout>
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
          </Layout>
        </ConnectedRouter>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={true}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>
);

export default Root;
