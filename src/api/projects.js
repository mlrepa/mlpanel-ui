import apiFetch from 'api/apiFetch';
import requestBodyEncode from 'utils/requestBodyEncode';

const URL = `projects`;

const getProjects = () =>
  apiFetch(URL, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

const getProject = id =>
  apiFetch(`${URL}/${id}`, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

const editProject = (id, data) =>
  apiFetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: requestBodyEncode(data)
  });

const deleteProject = id =>
  apiFetch(`${URL}/${id}`, {
    method: `DELETE`,
    headers: {
      Accept: 'application/json'
    }
  });

const runProject = id =>
  apiFetch(`${URL}/${id}/run`, {
    method: `PUT`,
    headers: {
      Accept: 'application/json'
    }
  });

const terminateProject = id =>
  apiFetch(`${URL}/${id}/terminate`, {
    method: `PUT`,
    headers: {
      Accept: 'application/json'
    }
  });

const archiveProject = id =>
  apiFetch(`${URL}/${id}/archive`, {
    method: `PUT`,
    headers: {
      Accept: 'application/json'
    }
  });

const restoreProject = id =>
  apiFetch(`${URL}/${id}/restore`, {
    method: `PUT`,
    headers: {
      Accept: 'application/json'
    }
  });

const createProject = data =>
  apiFetch(`${URL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: requestBodyEncode(data)
  });

export {
  getProjects,
  getProject,
  editProject,
  deleteProject,
  runProject,
  archiveProject,
  terminateProject,
  restoreProject,
  createProject
};
