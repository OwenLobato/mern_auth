import axios from 'axios';

export const request = async function (
  method,
  endpoint,
  headers,
  { data = {}, api = true } = {}
) {
  const apiVersion = process.env.REACT_APP_API_VERSION;
  const apiUrl = process.env.REACT_APP_API_URL;
  const port = process.env.REACT_APP_PORT;

  let url = `${apiUrl}:${port}`;
  if (api) url += apiVersion;

  return await axios({
    method,
    url: `${url}${endpoint}`,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    withCredentials: true,
  });
};
