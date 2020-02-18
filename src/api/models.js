import apiFetch from 'api/apiFetch';
import requestBodyEncode from '../utils/requestBodyEncode';

const URL = `registered-models`;

const getModels = projectId =>
  apiFetch(`${URL}?project_id=${projectId}`, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

const fetchModel = (id, projectId) =>
  apiFetch(`${URL}/${id}?project_id=${projectId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

const deleteModel = (id, projectId) =>
  apiFetch(`${URL}/${id}?project_id=${projectId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json'
    }
  });

const createModel = (id, data) =>
  apiFetch(`${URL}?project_id=${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: requestBodyEncode(data)
  });

export { getModels, fetchModel, deleteModel, createModel };
