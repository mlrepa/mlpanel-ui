import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { CookiesProvider } from 'react-cookie';

import history from './history';
import configureStore from './configureStore';

const store = configureStore({});

const Root = () => (
  <Provider store={store}>
    <CookiesProvider>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/" render={() => <div>Match</div>} />
            <Route render={() => <div>Miss</div>} />
          </Switch>
        </>
      </ConnectedRouter>
    </CookiesProvider>
  </Provider>
);

export default Root;
