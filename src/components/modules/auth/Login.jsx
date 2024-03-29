import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();

    login(email, password)
      .then(({ data }) => {
        localStorage.setItem('authToken', data.data.token);
        navigate('/');
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <div className='login-screen'>
      <form onSubmit={loginHandler} className='login-screen__form'>
        <h3 className='login-screen__title'>Login</h3>
        {error && <span className='message error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            required
            id='email'
            placeholder='Email address'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>
            Password:
            <Link
              to='/passwordForgot'
              className='login-screen__forgotpassword'
              tabIndex={4}
            >
              Forgot Password?
            </Link>
          </label>
          <input
            type='password'
            required
            id='password'
            autoComplete='true'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type='submit' className='btn btn-primary' tabIndex={3}>
          Login
        </button>

        <span className='login-screen__subtext'>
          Don't have an account? <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
  );
};
