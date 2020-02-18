import {
  FETCH_MODELS_REQUEST,
  FETCH_MODELS_SUCCESS,
  FETCH_MODEL_REQUEST,
  FETCH_MODEL_SUCCESS,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_REQUEST,
  CREATE_MODEL_REQUEST,
  CREATE_MODEL_SUCCESS
} from 'actionTypes/models';

const fetchModelsRequest = id => ({
  type: FETCH_MODELS_REQUEST,
  payload: id
});

const fetchModelsSuccess = data => ({
  type: FETCH_MODELS_SUCCESS,
  payload: [...data]
});

const fetchModelRequest = (id, projectId) => ({
  type: FETCH_MODEL_REQUEST,
  payload: { id, projectId }
});

const fetchModelSuccess = data => ({
  type: FETCH_MODEL_SUCCESS,
  payload: { ...data }
});

const deleteModelRequest = (id, projectId) => ({
  type: DELETE_MODEL_REQUEST,
  payload: { id, projectId }
});

const deleteModelSuccess = data => ({
  type: DELETE_MODEL_SUCCESS,
  payload: { ...data }
});

const createModelRequest = (id, data) => ({
  type: CREATE_MODEL_REQUEST,
  payload: { id, data }
});

const createModelSuccess = data => ({
  type: CREATE_MODEL_SUCCESS,
  payload: { ...data }
});

export {
  fetchModelsRequest,
  fetchModelsSuccess,
  fetchModelRequest,
  fetchModelSuccess,
  deleteModelRequest,
  deleteModelSuccess,
  createModelRequest,
  createModelSuccess
};
