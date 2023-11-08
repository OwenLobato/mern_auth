import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsers from '../../../hooks/useUsers';
import './Private.css';

export const Private = () => {
  const navigate = useNavigate();
  const { getUsers } = useUsers({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });

  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }

    getUsers()
      .then(({ data }) => {
        setPrivateData(data.message);
      })
      .catch((err) => {
        localStorage.removeItem('authToken');
        setError(
          err.response.data.message || 'You are not authorized, please login'
        );
      });
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
