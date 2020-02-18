import apiFetch from 'api/apiFetch';
import requestBodyEncode from 'utils/requestBodyEncode';

const URL = `experiments`;

const getExperiments = id =>
  apiFetch(`${URL}?project_id=${id}`, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

const createExperiment = (id, data) =>
  apiFetch(`${URL}?project_id=${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: requestBodyEncode(data)
  });

const fetchExperiment = (id, projectId) =>
  apiFetch(`${URL}/${id}?project_id=${projectId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

const deleteExperiment = (id, projectId) =>
  apiFetch(`${URL}/${id}?project_id=${projectId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json'
    }
  });

export { getExperiments, createExperiment, fetchExperiment, deleteExperiment };
