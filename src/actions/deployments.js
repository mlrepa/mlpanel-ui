import {
  FETCH_DEPLOYMENTS_REQUEST,
  FETCH_DEPLOYMENTS_SUCCESS,
  FETCH_DEPLOYMENT_REQUEST,
  FETCH_DEPLOYMENT_SUCCESS,
  RUN_DEPLOYMENT_REQUEST,
  RUN_DEPLOYMENT_SUCCESS,
  DELETE_DEPLOYMENT_REQUEST,
  DELETE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_REQUEST,
  STOP_DEPLOYMENT_REQUEST,
  STOP_DEPLOYMENT_SUCCESS
} from 'actionTypes/deployments';

const fetchDeploymentsRequest = () => ({
  type: FETCH_DEPLOYMENTS_REQUEST
});

const fetchDeploymentsSuccess = data => ({
  type: FETCH_DEPLOYMENTS_SUCCESS,
  payload: { ...data }
});

const fetchDeploymentRequest = id => ({
  type: FETCH_DEPLOYMENT_REQUEST,
  payload: id
});

const fetchDeploymentSuccess = data => ({
  type: FETCH_DEPLOYMENT_SUCCESS,
  payload: { ...data }
});

const deleteDeploymentRequest = id => ({
  type: DELETE_DEPLOYMENT_REQUEST,
  payload: id
});

const deleteDeploymentSuccess = data => ({
  type: DELETE_DEPLOYMENT_SUCCESS,
  payload: { ...data }
});

const runDeploymentRequest = id => ({
  type: RUN_DEPLOYMENT_REQUEST,
  payload: id
});

const runDeploymentSuccess = data => ({
  type: RUN_DEPLOYMENT_SUCCESS,
  payload: { ...data }
});

const stopDeploymentRequest = id => ({
  type: STOP_DEPLOYMENT_REQUEST,
  payload: id
});

const stopDeploymentSuccess = data => ({
  type: STOP_DEPLOYMENT_SUCCESS,
  payload: { ...data }
});

const createDeploymentRequest = (projectId, modelId, version, type) => ({
  type: CREATE_DEPLOYMENT_REQUEST,
  payload: { projectId, modelId, version, type }
});

const createDeploymentSuccess = data => ({
  type: CREATE_DEPLOYMENT_SUCCESS,
  payload: { ...data }
});

export {
  fetchDeploymentsRequest,
  fetchDeploymentsSuccess,
  fetchDeploymentSuccess,
  fetchDeploymentRequest,
  runDeploymentRequest,
  runDeploymentSuccess,
  deleteDeploymentRequest,
  deleteDeploymentSuccess,
  createDeploymentRequest,
  createDeploymentSuccess,
  stopDeploymentRequest,
  stopDeploymentSuccess
};
