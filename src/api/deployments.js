import apiFetch from 'api/apiFetch';

const URL = `deployments`;

const getDeployments = () =>
  apiFetch(URL, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

const getDeployment = id =>
  apiFetch(`${URL}/${id}`, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

const deleteDeployment = id =>
  apiFetch(`${URL}/${id}`, {
    method: `DELETE`,
    headers: {
      Accept: 'application/json'
    }
  });

const runDeployment = id =>
  apiFetch(`${URL}/${id}/run`, {
    method: `PUT`,
    headers: {
      Accept: 'application/json'
    }
  });

const stopDeployment = id =>
  apiFetch(`${URL}/${id}/stop`, {
    method: `PUT`,
    headers: {
      Accept: 'application/json'
    }
  });

const createDeployment = (projectId, modelId, version, type) =>
  apiFetch(
    `${URL}?project_id=${projectId}&model_id=${modelId}&version=${version}&type=${type}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

export {
  getDeployments,
  getDeployment,
  deleteDeployment,
  runDeployment,
  createDeployment,
  stopDeployment
};
