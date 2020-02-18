import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';

import projectsReducer from './projects';
import globalReducer from './global';
import experimentsReducer from './experiments';
import runsReducer from './runs';
import deploymentsReducer from './deployments';
import modelsReducer from './models';
import modelVersionsReducer from './modelVersions';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    projects: projectsReducer,
    global: globalReducer,
    experiments: experimentsReducer,
    runs: runsReducer,
    deployments: deploymentsReducer,
    models: modelsReducer,
    modelVersions: modelVersionsReducer
  });

export default createRootReducer;
