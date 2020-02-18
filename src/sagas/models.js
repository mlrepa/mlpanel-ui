import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { push } from 'connected-react-router';

import {
  FETCH_MODEL_REQUEST,
  FETCH_MODELS_REQUEST,
  DELETE_MODEL_REQUEST,
  CREATE_MODEL_REQUEST
} from 'actionTypes/models';

import {
  fetchModelsSuccess,
  fetchModelSuccess,
  deleteModelSuccess,
  createModelSuccess
} from 'actions/models';

import { setIsLoading, setIsError } from 'actions/global';

import { getModels, fetchModel, deleteModel, createModel } from 'api/models';

function* fetchModelsSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(getModels, payload);
    yield put(fetchModelsSuccess(resp.data));
    yield put(setIsLoading(false));
    yield put(setIsError(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* fetchModelSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(fetchModel, payload.id, payload.projectId);
    yield put(fetchModelSuccess(resp));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* deleteModelSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(deleteModel, payload.id, payload.projectId);
    yield put(deleteModelSuccess(resp.data));
    yield put(push('/models'));
    toastr.success(`Model ${payload.id} deleted!`);
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* createModelSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(createModel, payload.id, payload.data);
    toastr.success(`Model ${resp.data.id} created!`);
    yield put(createModelSuccess(resp));
    yield put(push(`/models/${resp.data.id}`));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

const modelsSagas = [
  takeEvery(FETCH_MODELS_REQUEST, fetchModelsSaga),
  takeEvery(FETCH_MODEL_REQUEST, fetchModelSaga),
  takeEvery(DELETE_MODEL_REQUEST, deleteModelSaga),
  takeEvery(CREATE_MODEL_REQUEST, createModelSaga)
];

export default modelsSagas;
