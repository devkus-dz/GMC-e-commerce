import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, Alert, CircularProgress } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import axios from '../utils/axiosConfig';
import useAuthStore from '../store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, setCredentials } = useAuthStore();

  const sp = new URLSearchParams(location.search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate(redirect);
      }
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      setCredentials(data);
      
      if (data.isAdmin) {
        // Admins go to Dashboard
        navigate('/admin/dashboard'); 
      } else {
        // Normal Users go to Shipping or Home
        navigate(redirect); 
      }
      
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 3 }}>
          <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: '50%', mb: 1 }}>
            <LoginIcon sx={{ color: 'white' }} />
          </Box>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}><CircularProgress /></Box>}

        <Box component="form" onSubmit={submitHandler}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign In
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              New Customer?{' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ textDecoration: 'none', color: '#1976d2' }}>
                Register Here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;