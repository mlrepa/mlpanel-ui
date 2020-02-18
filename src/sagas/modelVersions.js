import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import {
  FETCH_MODEL_VERSION_REQUEST,
  FETCH_MODEL_VERSIONS_REQUEST
} from 'actionTypes/modelVersions';

import {
  fetchModelVersionsSuccess,
  fetchModelVersionSuccess
} from 'actions/modelVersions';

import { setIsLoading, setIsError } from 'actions/global';

import { getModelVersions, fetchModelVersion } from 'api/modelVersions';

function* fetchModelVersionsSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(
      getModelVersions,
      payload.projectId,
      payload.modelId
    );
    yield put(fetchModelVersionsSuccess(resp.data));
    yield put(setIsLoading(false));
    yield put(setIsError(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* fetchModelVersionSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(
      fetchModelVersion,
      payload.id,
      payload.projectId,
      payload.experimentId
    );
    yield put(fetchModelVersionSuccess(resp));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

const modelVersionsSagas = [
  takeEvery(FETCH_MODEL_VERSIONS_REQUEST, fetchModelVersionsSaga),
  takeEvery(FETCH_MODEL_VERSION_REQUEST, fetchModelVersionSaga)
];

export default modelVersionsSagas;
