import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, Box, Avatar, Typography, TextField, Button, 
  Alert, Paper, Stack, Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import useAuthStore from '../store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Forgot Password State
  const [openForgot, setOpenForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();
  const { userInfo, setCredentials } = useAuthStore();

  // 1. Check existing login status
  useEffect(() => {
    if (userInfo) {
      // ✅ SMART REDIRECT: Admins -> Dashboard, Customers -> Home
      if (userInfo.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      setCredentials(data);
      
      // ✅ SMART REDIRECT: Redirect based on role immediately after login
      if (data.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // ... (Forgot Password Handlers remain the same) ...
  const handleForgotOpen = () => setOpenForgot(true);
  const handleForgotClose = () => {
    setOpenForgot(false);
    setResetMessage('');
    setResetEmail('');
  };
  const handleResetSubmit = () => {
    if (!resetEmail) return;
    setTimeout(() => {
      setResetMessage(`Password reset link sent to ${resetEmail}`);
      setTimeout(handleForgotClose, 3000);
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Stack spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>

            {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
            {resetMessage && <Alert severity="success" sx={{ width: '100%' }}>{resetMessage}</Alert>}

            <Box component="form" onSubmit={submitHandler} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Button size="small" onClick={handleForgotOpen} sx={{ textTransform: 'none' }}>
                  Forgot password?
                </Button>
                <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2', fontSize: '0.875rem' }}>
                  Don't have an account? Sign Up
                </Link>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>

      <Dialog open={openForgot} onClose={handleForgotClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reset-email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotClose}>Cancel</Button>
          <Button onClick={handleResetSubmit}>Send Reset Link</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;