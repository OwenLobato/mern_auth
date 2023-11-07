import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import './ResetPassword.css';

export const ResetPassword = () => {
  const { resetToken } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const apiURL = process.env.REACT_APP_API_URL;
      const port = process.env.REACT_APP_PORT;
      const apiVersion = process.env.REACT_APP_API_VERSION;

      const { data } = await axios.put(
        `${apiURL}:${port}/${apiVersion}/resetPassword/${resetToken}`,
        {
          password,
        },
        {
          header: {
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(data.data);
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='resetpassword-screen'>
      <form
        onSubmit={resetPasswordHandler}
        className='resetpassword-screen__form'
      >
        <h3 className='resetpassword-screen__title'>Reset Password</h3>
        {error && <span className='message error-message'>{error} </span>}
        {success && (
          <span className='message success-message'>
            {success} <Link to='/login'>Login</Link>
          </span>
        )}
        <div className='form-group'>
          <label htmlFor='password'>New Password:</label>
          <input
            type='password'
            required
            id='password'
            placeholder='Enter new password'
            autoComplete='true'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmpassword'>Confirm New Password:</label>
          <input
            type='password'
            required
            id='confirmpassword'
            placeholder='Confirm new password'
            autoComplete='true'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Reset Password
        </button>
      </form>
    </div>
  );
};
