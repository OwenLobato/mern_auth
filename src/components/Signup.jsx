import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export const Signup = () => {
  const initialInputs = {
    name: '',
    email: '',
    password: '',
  };
  const [inputs, setInputs] = useState(initialInputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('INPUTS: ', inputs);
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
          <Typography variant='h2'>Sign up</Typography>
          <TextField
            name='name'
            value={inputs.name}
            onChange={handleChangeInput}
            margin='normal'
            variant='outlined'
            placeholder='Name'
          />
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
            Sign up
          </Button>
        </Box>
      </form>
    </div>
  );
};
