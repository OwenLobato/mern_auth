import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const Welcome = () => {
  const [user, setUser] = useState();

  const sendRequest = async () => {
    const apiURL = process.env.REACT_APP_API_URL;
    const port = process.env.REACT_APP_PORT;
    const apiVersion = process.env.REACT_APP_API_VERSION;

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
    sendRequest()
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>{user && <h1>{user.name}</h1>}</div>;
};
