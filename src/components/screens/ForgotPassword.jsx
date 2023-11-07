import { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const apiURL = process.env.REACT_APP_API_URL;
      const port = process.env.REACT_APP_PORT;
      const apiVersion = process.env.REACT_APP_API_VERSION;

      const { data } = await axios.post(
        `${apiURL}:${port}/${apiVersion}/forgotPassword`,
        { email },
        {
          header: {
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(data.data);
    } catch (err) {
      setError(err.response.data.error);
      setEmail('');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='forgotpassword-screen'>
      <form
        onSubmit={forgotPasswordHandler}
        className='forgotpassword-screen__form'
      >
        <h3 className='forgotpassword-screen__title'>Forgot Password</h3>
        {error && <span className='error-message'>{error}</span>}
        {success && <span className='success-message'>{success}</span>}
        <div className='form-group'>
          <p className='forgotpassword-screen__subtext'>
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            required
            id='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Send Email
        </button>
      </form>
    </div>
  );
};
