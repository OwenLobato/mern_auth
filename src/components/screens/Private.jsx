import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Private.css';

export const Private = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }

    const fetchPrivateDate = async () => {
      try {
        const apiURL = process.env.REACT_APP_API_URL;
        const port = process.env.REACT_APP_PORT;
        const apiVersion = process.env.REACT_APP_API_VERSION;

        const { data } = await axios.get(
          `${apiURL}:${port}/${apiVersion}/private`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem('authToken');
        setError('You are not authorized, please login');
      }
    };

    fetchPrivateDate();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return error ? (
    <div className='private-container'>
      <span className='message error-message'>{error}</span>
      <button className='logout-button' onClick={() => navigate('/login')}>
        Ingresar
      </button>
    </div>
  ) : (
    <div className='private-container'>
      <div className='message success-message'>{privateData}</div>
      <button className='logout-button' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};
