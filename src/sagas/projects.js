import { takeEvery, put, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { push } from 'connected-react-router';

import {
  EDIT_PROJECT_REQUEST,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECTS_REQUEST,
  ARCHIVE_PROJECT_REQUEST,
  TERMINATE_PROJECT_REQUEST,
  RESTORE_PROJECT_REQUEST,
  RUN_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  CREATE_PROJECT_REQUEST
} from 'actionTypes/projects';

import {
  fetchProjectsSuccess,
  fetchProjectSuccess,
  editProjectSuccess,
  archiveProjectSuccess,
  runProjectSuccess,
  terminateProjectSuccess,
  deleteProjectSuccess,
  restoreProjectSuccess,
  createProjectSuccess,
  fetchProjectsRequest
} from 'actions/projects';

import { setIsLoading, setIsError } from 'actions/global';

import {
  getProjects,
  getProject,
  editProject,
  restoreProject,
  terminateProject,
  archiveProject,
  runProject,
  deleteProject,
  createProject
} from 'api/projects';

function* fetchProjectsSaga() {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(getProjects);
    yield put(fetchProjectsSuccess(resp));
    yield put(setIsLoading(false));
    yield put(setIsError(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
  }
}

function* fetchProjectSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(getProject, payload);
    yield put(fetchProjectSuccess(resp));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* editProjectSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(editProject, payload.id, payload.data);
    toastr.success(`Project ${payload.id} updated!`);
    yield put(editProjectSuccess(resp));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* deleteProjectSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(deleteProject, payload);
    yield put(deleteProjectSuccess(resp));
    yield put(push('/'));
    toastr.success(`Project ${payload} deleted!`);
    yield put(setIsLoading(false));
    yield put(fetchProjectsRequest());
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* runProjectSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(runProject, payload);
    yield put(runProjectSuccess(resp));
    toastr.success(`Project ${payload} ran!`);
    yield put(setIsLoading(false));
    yield put(fetchProjectsRequest());
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* archiveProjectSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(archiveProject, payload);
    yield put(archiveProjectSuccess(resp));
    toastr.success(`Project ${payload} archived!`);
    yield put(setIsLoading(false));
    yield put(fetchProjectsRequest());
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* terminateProjectSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(terminateProject, payload);
    yield put(terminateProjectSuccess(resp));
    toastr.success(`Project ${payload} terminated!`);
    yield put(setIsLoading(false));
    yield put(fetchProjectsRequest());
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* restoreProjectSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(restoreProject, payload);
    yield put(restoreProjectSuccess(resp));
    toastr.success(`Project ${payload} restored!`);
    yield put(setIsLoading(false));
    yield put(fetchProjectsRequest());
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

function* createProjectSaga({ payload }) {
  try {
    yield put(setIsLoading(true));
    yield put(setIsError(false));
    const resp = yield call(createProject, payload);
    toastr.success(`Project ${resp.data.id} created!`);
    yield put(createProjectSuccess(resp));
    yield put(push(`/${resp.data.id}`));
    yield put(setIsLoading(false));
  } catch (e) {
    toastr.error(e.response.data.message || 'Error!');
    yield put(setIsError(true));
    yield put(setIsLoading(false));
  }
}

const projectsSagas = [
  takeEvery(FETCH_PROJECTS_REQUEST, fetchProjectsSaga),
  takeEvery(FETCH_PROJECT_REQUEST, fetchProjectSaga),
  takeEvery(EDIT_PROJECT_REQUEST, editProjectSaga),
  takeEvery(DELETE_PROJECT_REQUEST, deleteProjectSaga),
  takeEvery(RESTORE_PROJECT_REQUEST, restoreProjectSaga),
  takeEvery(ARCHIVE_PROJECT_REQUEST, archiveProjectSaga),
  takeEvery(RUN_PROJECT_REQUEST, runProjectSaga),
  takeEvery(TERMINATE_PROJECT_REQUEST, terminateProjectSaga),
  takeEvery(CREATE_PROJECT_REQUEST, createProjectSaga)
];

export default projectsSagas;
