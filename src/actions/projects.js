import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  EDIT_PROJECT_REQUEST,
  EDIT_PROJECT_SUCCESS,
  RESTORE_PROJECT_REQUEST,
  RESTORE_PROJECT_SUCCESS,
  RUN_PROJECT_REQUEST,
  RUN_PROJECT_SUCCESS,
  ARCHIVE_PROJECT_REQUEST,
  ARCHIVE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  TERMINATE_PROJECT_REQUEST,
  TERMINATE_PROJECT_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST
} from 'actionTypes/projects';

const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST
});

const fetchProjectsSuccess = data => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: { ...data }
});

const fetchProjectRequest = id => ({
  type: FETCH_PROJECT_REQUEST,
  payload: id
});

const fetchProjectSuccess = data => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: { ...data }
});

const editProjectRequest = (id, data) => ({
  type: EDIT_PROJECT_REQUEST,
  payload: {
    id,
    data
  }
});

const editProjectSuccess = data => ({
  type: EDIT_PROJECT_SUCCESS,
  payload: { ...data }
});

const deleteProjectRequest = id => ({
  type: DELETE_PROJECT_REQUEST,
  payload: id
});

const deleteProjectSuccess = data => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: { ...data }
});

const runProjectRequest = id => ({
  type: RUN_PROJECT_REQUEST,
  payload: id
});

const runProjectSuccess = data => ({
  type: RUN_PROJECT_SUCCESS,
  payload: { ...data }
});

const restoreProjectRequest = id => ({
  type: RESTORE_PROJECT_REQUEST,
  payload: id
});

const restoreProjectSuccess = data => ({
  type: RESTORE_PROJECT_SUCCESS,
  payload: { ...data }
});

const terminateProjectRequest = id => ({
  type: TERMINATE_PROJECT_REQUEST,
  payload: id
});

const terminateProjectSuccess = data => ({
  type: TERMINATE_PROJECT_SUCCESS,
  payload: { ...data }
});

const archiveProjectRequest = id => ({
  type: ARCHIVE_PROJECT_REQUEST,
  payload: id
});

const archiveProjectSuccess = data => ({
  type: ARCHIVE_PROJECT_SUCCESS,
  payload: { ...data }
});

const createProjectRequest = data => ({
  type: CREATE_PROJECT_REQUEST,
  payload: { ...data }
});

const createProjectSuccess = data => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: { ...data }
});

export {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectSuccess,
  fetchProjectRequest,
  editProjectRequest,
  editProjectSuccess,
  restoreProjectRequest,
  restoreProjectSuccess,
  runProjectRequest,
  runProjectSuccess,
  archiveProjectRequest,
  archiveProjectSuccess,
  deleteProjectRequest,
  deleteProjectSuccess,
  terminateProjectRequest,
  terminateProjectSuccess,
  createProjectRequest,
  createProjectSuccess
};
