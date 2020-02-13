import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { CookiesProvider } from 'react-cookie';

import history from './history';
import routes from './routes';

import configureStore from './configureStore';

const store = configureStore({});

const Root = () => (
  <Provider store={store}>
    <CookiesProvider>
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
    </CookiesProvider>
  </Provider>
);

export default Root;
