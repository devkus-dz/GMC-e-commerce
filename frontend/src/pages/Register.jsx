import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Avatar, Typography, TextField, Button, Alert, Paper, Stack } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from '../utils/axiosConfig';
import useAuthStore from '../store';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [validationErrors, setValidationErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  
  const navigate = useNavigate();

  // Zustand: Get state and actions
  const { userInfo, setCredentials } = useAuthStore();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  // Validation Logic
  const validateInputs = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!name.trim()) errors.name = 'Name is required';
    else if (!nameRegex.test(name)) errors.name = 'Invalid characters in name';

    if (!email.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(email)) errors.email = 'Invalid email format';

    if (!password) errors.password = 'Password is required';
    else if (!passwordRegex.test(password)) errors.password = 'Min 8 chars, 1 number, 1 special char';

    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

    return errors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setServerError(null);
    
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      
      const { data } = await axios.post(
        '/api/users/register',
        { 
          name: name.trim(), 
          email: email.trim().toLowerCase(), 
          password 
        },
        config
      );

      // Zustand: Save to store & localStorage automatically
      setCredentials(data);
      navigate('/');
    } catch (err) {
      setServerError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Stack spacing={2} alignItems="center">
            
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AppRegistrationIcon />
            </Avatar>
            
            <Typography component="h1" variant="h5">
              Secure Sign Up
            </Typography>

            {serverError && <Alert severity="error" sx={{ width: '100%' }}>{serverError}</Alert>}

            <Box component="form" onSubmit={submitHandler} sx={{ mt: 1, width: '100%' }} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!validationErrors.password}
                helperText={validationErrors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!validationErrors.confirmPassword}
                helperText={validationErrors.confirmPassword}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>

              <Stack direction="row" justifyContent="flex-end">
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontSize: '0.875rem' }}>
                  Already have an account? Sign in
                </Link>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;