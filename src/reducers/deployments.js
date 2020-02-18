import {
  FETCH_DEPLOYMENTS_SUCCESS,
  FETCH_DEPLOYMENT_SUCCESS,
  RUN_DEPLOYMENT_SUCCESS,
  DELETE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_SUCCESS,
  STOP_DEPLOYMENT_SUCCESS
} from 'actionTypes/deployments';

const initialState = {
  deployments: [],
  current: {}
};

const deploymentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DEPLOYMENTS_SUCCESS:
      return {
        ...state,
        deployments: [...payload.data]
      };
    case FETCH_DEPLOYMENT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case DELETE_DEPLOYMENT_SUCCESS:
      return {
        ...state,
        deployments: state.deployments.filter(item => item.id !== payload.id)
      };
    case RUN_DEPLOYMENT_SUCCESS:
      return {
        ...state
      };
    case STOP_DEPLOYMENT_SUCCESS:
      return {
        ...state
      };
    case CREATE_DEPLOYMENT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    default:
      return { ...state };
  }
};

export default deploymentsReducer;
