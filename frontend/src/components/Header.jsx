import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import useAuthStore from '../store';

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuthStore();

  const logoutHandler = () => {
    // 1. Start moving to Home
    navigate('/');

    // 2. Wait 100ms for the page to actually change, THEN clear data
    setTimeout(() => {
      logout();
    }, 100);
  };

  return (
    <AppBar position="static" style={{ background: '#203040' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
        >
          ProShop Admin
        </Typography>

        {userInfo ? (
          <Button 
            color="inherit" 
            onClick={logoutHandler}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        ) : (
          <Box>
            <Button component={Link} to="/login" color="inherit" startIcon={<LoginIcon />}>
              Sign In
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;