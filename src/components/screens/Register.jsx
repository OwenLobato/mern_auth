import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

export const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }

    try {
      const apiURL = process.env.REACT_APP_API_URL;
      const port = process.env.REACT_APP_PORT;
      const apiVersion = process.env.REACT_APP_API_VERSION;

      const { data } = await axios.post(
        `${apiURL}:${port}/${apiVersion}/register`,
        {
          username,
          email,
          password,
        },
        {
          header: {
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.setItem('authToken', data.token);

      navigate('/');
    } catch (err) {
      setError(
        err?.response?.data?.error || 'Error on server, try again later'
      );
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='register-screen'>
      <form onSubmit={registerHandler} className='register-screen__form'>
        <h3 className='register-screen__title'>Register</h3>
        {error && <span className='message error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='name'>Username:</label>
          <input
            type='text'
            required
            id='name'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            required
            id='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            required
            id='password'
            autoComplete='true'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            required
            id='confirmPassword'
            autoComplete='true'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Register
        </button>

        <span className='register-screen__subtext'>
          Already have an account? <Link to='/'>Login</Link>
        </span>
      </form>
    </div>
  );
};
