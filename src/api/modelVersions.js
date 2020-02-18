import apiFetch from 'api/apiFetch';

const URL = `model-versions`;

const getModelVersions = (projectId, model_id) =>
  apiFetch(`${URL}?project_id=${projectId}&model_id=${model_id}`, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

const fetchModelVersion = (id, projectId, experimentId) =>
  apiFetch(
    `${URL}/${id}?project_id=${projectId}&experiment_id=${experimentId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }
  );

export { getModelVersions, fetchModelVersion };
