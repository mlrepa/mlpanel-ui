import { FETCH_ARTIFACTS_SUCCESS } from 'actionTypes/artifacts';

const initialState = {
  artifacts: [],
  current: {}
};

const artifactsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ARTIFACTS_SUCCESS:
      return { ...state, artifacts: [...payload] };
    default:
      return { ...state };
  }
};

export default artifactsReducer;
