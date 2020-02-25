import apiFetch from 'api/apiFetch';

const URL = `artifacts`;

const getArtifacts = (projectId, runId) =>
  apiFetch(`${URL}?project_id=${projectId}&run_id=${runId}`, {
    method: `GET`,
    headers: {
      Accept: 'application/json'
    }
  });

export { getArtifacts };
