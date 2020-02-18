import apiFetch from 'api/apiFetch';

const URL = `runs`;

const getRuns = (projectId, experimentId) =>
  apiFetch(`${URL}?project_id=${projectId}&experiment_id=${experimentId}`, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

const fetchRun = (id, projectId, experimentId) =>
  apiFetch(
    `${URL}/${id}?project_id=${projectId}&experiment_id=${experimentId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }
  );

const deleteRun = (id, projectId, experimentId) =>
  apiFetch(
    `${URL}/${id}?project_id=${projectId}&experiment_id=${experimentId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    }
  );

export { getRuns, fetchRun, deleteRun };
