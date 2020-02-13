import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import history from './history';
import createRootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const configureStore = preloadedState =>
  createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
  );

export default configureStore;
