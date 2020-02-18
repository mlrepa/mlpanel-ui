import { all } from 'redux-saga/effects';

import projectsSagas from './projects';
import experimentsSagas from './experiments';
import runsSagas from './runs';
import deploymentsSagas from './deployments';
import modelsSagas from './models';
import modelVersionsSagas from './modelVersions';

export default function* rootSaga() {
  yield all([
    ...projectsSagas,
    ...experimentsSagas,
    ...runsSagas,
    ...deploymentsSagas,
    ...modelsSagas,
    ...modelVersionsSagas
  ]);
}
