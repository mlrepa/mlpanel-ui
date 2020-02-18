import {
  FETCH_RUN_SUCCESS,
  FETCH_RUNS_SUCCESS,
  DELETE_RUN_SUCCESS
} from 'actionTypes/runs';

const initialState = {
  runs: [],
  current: {}
};

const runsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RUNS_SUCCESS:
      return { ...state, runs: [...payload] };
    case FETCH_RUN_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case DELETE_RUN_SUCCESS:
      return {
        ...state,
        runs: state.runs.filter(item => item.id !== payload.id)
      };
    default:
      return { ...state };
  }
};

export default runsReducer;
