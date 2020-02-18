import {
  FETCH_MODEL_SUCCESS,
  FETCH_MODELS_SUCCESS,
  DELETE_MODEL_SUCCESS,
  CREATE_MODEL_SUCCESS
} from 'actionTypes/models';

const initialState = {
  models: [],
  current: {}
};

const modelsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MODELS_SUCCESS:
      return { ...state, models: [...payload] };
    case FETCH_MODEL_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case DELETE_MODEL_SUCCESS:
      return {
        ...state,
        models: state.models.filter(item => item.id !== payload.id)
      };
    case CREATE_MODEL_SUCCESS:
      return { ...state, current: { ...payload.data } };
    default:
      return { ...state };
  }
};

export default modelsReducer;
