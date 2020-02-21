import {
  FETCH_ARTIFACTS_REQUEST,
  FETCH_ARTIFACTS_SUCCESS
} from 'actionTypes/artifacts';

const fetchArtifactsRequest = (projectId, runId) => ({
  type: FETCH_ARTIFACTS_REQUEST,
  payload: { projectId, runId }
});

const fetchArtifactsSuccess = data => ({
  type: FETCH_ARTIFACTS_SUCCESS,
  payload: [...data]
});

export { fetchArtifactsRequest, fetchArtifactsSuccess };
