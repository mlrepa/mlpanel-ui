import {
  FETCH_EXPERIMENTS_REQUEST,
  FETCH_EXPERIMENTS_SUCCESS,
  CREATE_EXPERIMENT_REQUEST,
  CREATE_EXPERIMENT_SUCCESS,
  FETCH_EXPERIMENT_REQUEST,
  FETCH_EXPERIMENT_SUCCESS,
  DELETE_EXPERIMENT_SUCCESS,
  DELETE_EXPERIMENT_REQUEST
} from 'actionTypes/experiments';

const fetchExperimentsRequest = id => ({
  type: FETCH_EXPERIMENTS_REQUEST,
  payload: id
});

const fetchExperimentsSuccess = data => ({
  type: FETCH_EXPERIMENTS_SUCCESS,
  payload: [...data]
});

const createExperimentRequest = (id, data) => ({
  type: CREATE_EXPERIMENT_REQUEST,
  payload: { id, data }
});

const createExperimentSuccess = data => ({
  type: CREATE_EXPERIMENT_SUCCESS,
  payload: { ...data }
});

const fetchExperimentRequest = (id, projectId) => ({
  type: FETCH_EXPERIMENT_REQUEST,
  payload: { id, projectId }
});

const fetchExperimentSuccess = data => ({
  type: FETCH_EXPERIMENT_SUCCESS,
  payload: { ...data }
});

const deleteExperimentRequest = (id, projectId) => ({
  type: DELETE_EXPERIMENT_REQUEST,
  payload: { id, projectId }
});

const deleteExperimentSuccess = data => ({
  type: DELETE_EXPERIMENT_SUCCESS,
  payload: { ...data }
});

export {
  fetchExperimentsRequest,
  fetchExperimentsSuccess,
  createExperimentRequest,
  createExperimentSuccess,
  fetchExperimentRequest,
  fetchExperimentSuccess,
  deleteExperimentRequest,
  deleteExperimentSuccess
};
