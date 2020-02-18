import {
  SET_CURRENT_PROJECT,
  SET_CURRENT_EXPERIMENT,
  SET_IS_ERROR,
  SET_IS_LOADING
} from 'actionTypes/global';

const initialState = {
  isError: false,
  isLoading: false,
  current: {
    project: '',
    experiment: ''
  }
};

const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    case SET_IS_ERROR:
      return { ...state, isError: payload };
    case SET_CURRENT_PROJECT:
      return { ...state, current: { ...state.current, project: payload } };
    case SET_CURRENT_EXPERIMENT:
      return { ...state, current: { ...state.current, experiment: payload } };
    default:
      return { ...state };
  }
};

export default globalReducer;
