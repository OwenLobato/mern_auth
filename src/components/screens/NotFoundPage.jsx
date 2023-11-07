import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className='not-found-container'>
      <div className='not-found-content'>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to='/login'>Volver al Inicio</Link>
      </div>
    </div>
  );
};
