import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, TextField, Button, Paper, Box 
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import useAuthStore from '../store';

const Shipping = () => {
  const navigate = useNavigate();
  const { shippingAddress, saveShippingAddress } = useAuthStore();

  // Initialize state with stored address if it exists
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    // Save data to store
    saveShippingAddress({ address, city, postalCode, country });
    
    // Navigate to Payment Selection
    navigate('/payment');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LocalShippingIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h4" fontWeight="bold">
            Shipping Address
          </Typography>
        </Box>

        <form onSubmit={submitHandler}>
          <TextField
            label="Address"
            fullWidth
            required
            variant="outlined"
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            label="City"
            fullWidth
            required
            variant="outlined"
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <TextField
            label="Postal Code"
            fullWidth
            required
            variant="outlined"
            margin="normal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <TextField
            label="Country"
            fullWidth
            required
            variant="outlined"
            margin="normal"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            sx={{ mt: 3 }}
          >
            Continue to Payment
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Shipping;