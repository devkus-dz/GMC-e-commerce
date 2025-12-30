import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Button, Paper, 
  FormControl, RadioGroup, FormControlLabel, Radio, Box 
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import useAuthStore from '../store';

const Payment = () => {
  const navigate = useNavigate();
  const { shippingAddress, savePaymentMethod } = useAuthStore();
  
  // Default to "Cash on Delivery"
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  // If no shipping address, kick them back to shipping page
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    navigate('/placeorder');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PaymentIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h4" fontWeight="bold">
            Payment Method
          </Typography>
        </Box>

        <form onSubmit={submitHandler}>
          <FormControl component="fieldset">
            <Typography variant="h6" sx={{ mb: 2 }}>Select Method</Typography>
            <RadioGroup 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel 
                value="Cash on Delivery" 
                control={<Radio />} 
                label="Cash on Delivery (Pay when you receive)" 
              />
              <FormControlLabel 
                value="PayPal" 
                control={<Radio />} 
                label="PayPal or Credit Card" 
              />
            </RadioGroup>
          </FormControl>

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            sx={{ mt: 4 }}
          >
            Continue
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Payment;