import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { authActions } from '../store';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialInputs = {
    email: '',
    password: '',
  };
  const [inputs, setInputs] = useState(initialInputs);

  const sendRequest = async () => {
    const apiURL = process.env.REACT_APP_API_URL;
    const port = process.env.REACT_APP_PORT;
    const apiVersion = process.env.REACT_APP_API_VERSION;

    const res = await axios
      .post(`${apiURL}:${port}/${apiVersion}/login`, {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => new Error(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => navigate('/user'))
      .catch((err) => console.log(err));
  };

  const handleChangeInput = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            mx: 'auto',
          }}
        >
          <Typography variant='h2'>Login</Typography>
          <TextField
            name='email'
            value={inputs.email}
            onChange={handleChangeInput}
            margin='normal'
            variant='outlined'
            placeholder='Email'
            type='email'
          />
          <TextField
            name='password'
            value={inputs.password}
            onChange={handleChangeInput}
            margin='normal'
            variant='outlined'
            placeholder='Password'
            type='password'
          />
          <Button variant='contained' type='submit'>
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};
