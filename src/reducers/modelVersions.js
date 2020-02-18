import {
  FETCH_MODEL_VERSION_SUCCESS,
  FETCH_MODEL_VERSIONS_SUCCESS
} from 'actionTypes/modelVersions';

const initialState = {
  modelVersions: [],
  current: {}
};

const modelVersionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MODEL_VERSIONS_SUCCESS:
      return { ...state, modelVersions: [...payload] };
    case FETCH_MODEL_VERSION_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    default:
      return { ...state };
  }
};

export default modelVersionsReducer;
