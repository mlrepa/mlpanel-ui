import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import history from './history';
import createRootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const configureStore = preloadedState =>
  createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

export default configureStore;
