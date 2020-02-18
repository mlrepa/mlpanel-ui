import {
  FETCH_MODEL_VERSIONS_REQUEST,
  FETCH_MODEL_VERSIONS_SUCCESS,
  FETCH_MODEL_VERSION_REQUEST,
  FETCH_MODEL_VERSION_SUCCESS
} from 'actionTypes/modelVersions';

const fetchModelVersionsRequest = (projectId, modelId) => ({
  type: FETCH_MODEL_VERSIONS_REQUEST,
  payload: { projectId, modelId }
});

const fetchModelVersionsSuccess = data => ({
  type: FETCH_MODEL_VERSIONS_SUCCESS,
  payload: [...data]
});

const fetchModelVersionRequest = (id, projectId, modelId) => ({
  type: FETCH_MODEL_VERSION_REQUEST,
  payload: { id, projectId, modelId }
});

const fetchModelVersionSuccess = data => ({
  type: FETCH_MODEL_VERSION_SUCCESS,
  payload: { ...data }
});

export {
  fetchModelVersionsRequest,
  fetchModelVersionsSuccess,
  fetchModelVersionRequest,
  fetchModelVersionSuccess
};
