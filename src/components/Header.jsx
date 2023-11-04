import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store';

axios.defaults.withCredentials = true;

export const Header = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const sendLogoutReq = async () => {
    const apiURL = process.env.REACT_APP_API_URL;
    const port = process.env.REACT_APP_PORT;
    const apiVersion = process.env.REACT_APP_API_VERSION;

    const res = await axios.post(
      `${apiURL}:${port}/${apiVersion}/logout`,
      null,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      return res;
    }
    return new Error('Unable to logout, Try again');
  };

  const handleLogout = () => {
    sendLogoutReq()
      .then(() => dispatch(authActions.logout()))
      .catch((err) => console.log(err));
    setValue(0);
  };

  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h3'>MERN Auth</Typography>
          <Box sx={{ ml: 'auto' }}>
            <Tabs
              indicatorColor='secondary'
              textColor='inherit'
              onChange={(e, val) => setValue(val)}
              value={value}
            >
              {!isLoggedIn && (
                <>
                  <Tab label='Login' LinkComponent={Link} to='/login' />
                  <Tab label='Signup' LinkComponent={Link} to='/signup' />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  label='Logout'
                  LinkComponent={Link}
                  to='/login'
                  onClick={handleLogout}
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
