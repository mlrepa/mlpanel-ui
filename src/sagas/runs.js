import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { push } from 'connected-react-router';

import {
  FETCH_RUN_REQUEST,
  FETCH_RUNS_REQUEST,
  DELETE_RUN_REQUEST
} from 'actionTypes/runs';

import {
  fetchRunsSuccess,
  fetchRunSuccess,
  deleteRunSuccess
} from 'actions/runs';

import { setIsLoading, setIsError } from 'actions/global';

import { getRuns, fetchRun, deleteRun } from 'api/runs';

function* fetchRunsSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(getRuns, payload.projectId, payload.experimentId);
    yield put(fetchRunsSuccess(resp.data));
    yield put(setIsLoading(false));
    yield put(setIsError(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* fetchRunSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(
      fetchRun,
      payload.id,
      payload.projectId,
      payload.experimentId
    );
    yield put(fetchRunSuccess(resp));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* deleteRunSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(
      deleteRun,
      payload.id,
      payload.projectId,
      payload.experimentId
    );
    yield put(deleteRunSuccess(resp.data));
    yield put(push('/runs'));
    toastr.success(`Run ${payload.id} deleted!`);
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

const runsSagas = [
  takeEvery(FETCH_RUNS_REQUEST, fetchRunsSaga),
  takeEvery(FETCH_RUN_REQUEST, fetchRunSaga),
  takeEvery(DELETE_RUN_REQUEST, deleteRunSaga)
];

export default runsSagas;
