import axios from 'axios';

const apiFetch = (url, options = {}) => {
  const apiUrl = process.env.REACT_APP_API_URL + url;

  return axios(apiUrl, options);
};

export default apiFetch;
