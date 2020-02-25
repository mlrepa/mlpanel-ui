import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import { FETCH_ARTIFACTS_REQUEST } from 'actionTypes/artifacts';

import { fetchArtifactsSuccess } from 'actions/artifacts';

import { setIsLoading, setIsError } from 'actions/global';

import { getArtifacts } from 'api/artifacts';

function* fetchArtifactsSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(getArtifacts, payload.projectId, payload.runId);
    yield put(fetchArtifactsSuccess(resp.data));
    yield put(setIsLoading(false));
    yield put(setIsError(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

const artifactsSagas = [takeEvery(FETCH_ARTIFACTS_REQUEST, fetchArtifactsSaga)];

export default artifactsSagas;
