import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { push } from 'connected-react-router';

import {
  CREATE_EXPERIMENT_REQUEST,
  FETCH_EXPERIMENTS_REQUEST,
  FETCH_EXPERIMENT_REQUEST,
  DELETE_EXPERIMENT_REQUEST
} from 'actionTypes/experiments';

import {
  createExperimentSuccess,
  fetchExperimentsSuccess,
  fetchExperimentSuccess,
  deleteExperimentSuccess
} from 'actions/experiments';
import { setIsLoading, setIsError } from 'actions/global';

import {
  getExperiments,
  createExperiment,
  fetchExperiment,
  deleteExperiment
} from 'api/experiments';

function* fetchExperimentsSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(getExperiments, payload);
    yield put(fetchExperimentsSuccess(resp.data));
    yield put(setIsLoading(false));
    yield put(setIsError(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* createExperimentSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(createExperiment, payload.id, payload.data);
    toastr.success(`Experiment ${resp.data.experiment_id} created!`);
    yield put(createExperimentSuccess(resp));
    yield put(push(`/experiments/${resp.data.experiment_id}`));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* fetchExperimentSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(fetchExperiment, payload.id, payload.projectId);
    yield put(fetchExperimentSuccess(resp));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* deleteExperimentSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(deleteExperiment, payload.id, payload.projectId);
    yield put(deleteExperimentSuccess(resp.data));
    yield put(push('/experiments'));
    toastr.success(`Experiment ${payload.id} deleted!`);
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

const experimentsSagas = [
  takeEvery(FETCH_EXPERIMENTS_REQUEST, fetchExperimentsSaga),
  takeEvery(CREATE_EXPERIMENT_REQUEST, createExperimentSaga),
  takeEvery(FETCH_EXPERIMENT_REQUEST, fetchExperimentSaga),
  takeEvery(DELETE_EXPERIMENT_REQUEST, deleteExperimentSaga)
];

export default experimentsSagas;
