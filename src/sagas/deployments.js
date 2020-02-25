import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { push } from 'connected-react-router';

import {
  FETCH_DEPLOYMENT_REQUEST,
  FETCH_DEPLOYMENTS_REQUEST,
  RUN_DEPLOYMENT_REQUEST,
  DELETE_DEPLOYMENT_REQUEST,
  CREATE_DEPLOYMENT_REQUEST,
  STOP_DEPLOYMENT_REQUEST
} from 'actionTypes/deployments';

import {
  fetchDeploymentsSuccess,
  fetchDeploymentSuccess,
  runDeploymentSuccess,
  deleteDeploymentSuccess,
  createDeploymentSuccess,
  stopDeploymentSuccess,
  fetchDeploymentRequest,
  fetchDeploymentsRequest
} from 'actions/deployments';

import { setIsLoading, setIsError } from 'actions/global';

import {
  getDeployments,
  getDeployment,
  runDeployment,
  deleteDeployment,
  createDeployment,
  stopDeployment
} from 'api/deployments';

function* fetchDeploymentsSaga() {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(getDeployments);
    yield put(fetchDeploymentsSuccess(resp));
    yield put(setIsLoading(false));
    yield put(setIsError(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
  }
}

function* fetchDeploymentSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(getDeployment, payload);
    yield put(fetchDeploymentSuccess(resp));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* deleteDeploymentSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(deleteDeployment, payload);
    yield put(deleteDeploymentSuccess(resp));
    yield put(push('/deployments'));
    toastr.success(`Deployment ${payload} deleted!`);
    yield put(setIsLoading(false));
    yield put(fetchDeploymentsRequest());
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* runDeploymentSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(runDeployment, payload);
    yield put(runDeploymentSuccess(resp));
    yield put(fetchDeploymentRequest(payload));
    toastr.success(`Deployment ${payload} ran!`);
    yield put(setIsLoading(false));
    yield put(fetchDeploymentsRequest());
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* stopDeploymentSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(stopDeployment, payload);
    yield put(stopDeploymentSuccess(resp));
    yield put(fetchDeploymentRequest(payload));
    toastr.success(`Deployment ${payload} stopped!`);
    yield put(setIsLoading(false));
    yield put(fetchDeploymentsRequest());
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* createDeploymentSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(
      createDeployment,
      payload.projectId,
      payload.modelId,
      payload.version,
      payload.type
    );
    toastr.success(`Deployment ${resp.data.deployment_id} created!`);
    yield put(createDeploymentSuccess(resp));
    yield put(push(`/deployments/${resp.data.deployment_id}`));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

const deploymentsSagas = [
  takeEvery(FETCH_DEPLOYMENTS_REQUEST, fetchDeploymentsSaga),
  takeEvery(FETCH_DEPLOYMENT_REQUEST, fetchDeploymentSaga),
  takeEvery(DELETE_DEPLOYMENT_REQUEST, deleteDeploymentSaga),
  takeEvery(RUN_DEPLOYMENT_REQUEST, runDeploymentSaga),
  takeEvery(STOP_DEPLOYMENT_REQUEST, stopDeploymentSaga),
  takeEvery(CREATE_DEPLOYMENT_REQUEST, createDeploymentSaga)
];

export default deploymentsSagas;
