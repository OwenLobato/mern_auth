import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

let isFirstRender = true;

export const Welcome = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const port = process.env.REACT_APP_PORT;
  const apiVersion = process.env.REACT_APP_API_VERSION;

  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get(`${apiURL}:${port}/${apiVersion}/refresh`, {
        withCredentials: true,
      })
      .catch((err) => {
        throw new Error(err);
      });

    const data = await res.data;
    return data;
  };

  const sendRequest = async () => {
    const res = await axios
      .get(`${apiURL}:${port}/${apiVersion}/user`, {
        withCredentials: true,
      })
      .catch((err) => {
        throw new Error(err);
      });

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      sendRequest()
        .then((data) => setUser(data.user))
        .catch((err) => console.log(err));
    }
    let interval = setInterval(() => {
      refreshToken()
        .then((data) => setUser(data.user))
        .catch((err) => console.log(err));
    }, 1000 * 29);

    return () => clearInterval(interval);
  }, []);

  return <div>{user && <h1>{user.name}</h1>}</div>;
};
