import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  RESTORE_PROJECT_SUCCESS,
  RUN_PROJECT_SUCCESS,
  ARCHIVE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  TERMINATE_PROJECT_SUCCESS,
  CREATE_PROJECT_SUCCESS
} from 'actionTypes/projects';

const initialState = {
  projects: [],
  current: {}
};

const projectsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: [...payload.data]
      };
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(item => item.id !== payload.id)
      };
    case RUN_PROJECT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case TERMINATE_PROJECT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case ARCHIVE_PROJECT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case RESTORE_PROJECT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        current: { ...payload.data }
      };
    default:
      return { ...state };
  }
};

export default projectsReducer;
