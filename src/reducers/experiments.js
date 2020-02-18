import {
  CREATE_EXPERIMENT_SUCCESS,
  FETCH_EXPERIMENTS_SUCCESS,
  FETCH_EXPERIMENT_SUCCESS,
  DELETE_EXPERIMENT_SUCCESS
} from 'actionTypes/experiments';

const initialState = {
  experiments: [],
  current: {}
};

const experimentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_EXPERIMENTS_SUCCESS:
      return { ...state, experiments: [...payload] };
    case CREATE_EXPERIMENT_SUCCESS:
      return { ...state, current: { ...payload } };
    case FETCH_EXPERIMENT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case DELETE_EXPERIMENT_SUCCESS:
      return {
        ...state,
        experiments: state.experiments.filter(
          item => item.id !== payload.experiment_id
        )
      };
    default:
      return { ...state };
  }
};

export default experimentsReducer;
