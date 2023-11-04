import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Tab, Tabs } from '@mui/material';

export const Header = () => {
  const [value, setValue] = useState(0);

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
              <Tab label='Login' />
              <Tab label='Signup' />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
