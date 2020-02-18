import {
  FETCH_RUNS_REQUEST,
  FETCH_RUNS_SUCCESS,
  FETCH_RUN_REQUEST,
  FETCH_RUN_SUCCESS,
  DELETE_RUN_SUCCESS,
  DELETE_RUN_REQUEST
} from 'actionTypes/runs';

const fetchRunsRequest = (projectId, experimentId) => ({
  type: FETCH_RUNS_REQUEST,
  payload: { projectId, experimentId }
});

const fetchRunsSuccess = data => ({
  type: FETCH_RUNS_SUCCESS,
  payload: [...data]
});

const fetchRunRequest = (id, projectId, experimentId) => ({
  type: FETCH_RUN_REQUEST,
  payload: { id, projectId, experimentId }
});

const fetchRunSuccess = data => ({
  type: FETCH_RUN_SUCCESS,
  payload: { ...data }
});

const deleteRunRequest = (id, projectId, experimentId) => ({
  type: DELETE_RUN_REQUEST,
  payload: { id, projectId, experimentId }
});

const deleteRunSuccess = data => ({
  type: DELETE_RUN_SUCCESS,
  payload: { ...data }
});

export {
  fetchRunsRequest,
  fetchRunsSuccess,
  fetchRunRequest,
  fetchRunSuccess,
  deleteRunRequest,
  deleteRunSuccess
};
