import {
  SET_CURRENT_PROJECT,
  SET_CURRENT_EXPERIMENT,
  SET_IS_ERROR,
  SET_IS_LOADING
} from 'actionTypes/global';

const setIsLoading = data => ({
  type: SET_IS_LOADING,
  payload: data
});

const setIsError = data => ({
  type: SET_IS_ERROR,
  payload: data
});

const setCurrentProject = id => ({
  type: SET_CURRENT_PROJECT,
  payload: id
});

const setCurrentExperiment = id => ({
  type: SET_CURRENT_EXPERIMENT,
  payload: id
});

export { setCurrentExperiment, setCurrentProject, setIsError, setIsLoading };
