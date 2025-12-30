import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Box, Divider, Button, 
  List, ListItem, ListItemAvatar, Avatar, ListItemText, Alert 
} from '@mui/material';
import axios from '../utils/axiosConfig';
import useAuthStore from '../store';

const PlaceOrder = () => {
  const navigate = useNavigate();
  // Get userInfo to access token
  const { cartItems, shippingAddress, paymentMethod, clearCart, userInfo } = useAuthStore();

  // --- Calculations ---
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  
  // Shipping: Free if order > $100, else $10
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  
  // Tax: 15%
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  
  // Total Price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // --- Redirect Check ---
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  // --- Place Order Handler ---
  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Map cartItems to ensure 'product' field exists for Mongoose
      const orderItemsPayload = cartItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,  
      }));

      const { data } = await axios.post(
        '/api/orders', 
        {
          orderItems: orderItemsPayload, // Send the transformed array
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        config 
      );

      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      
      {/* Checkout Steps Indicator */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
         <Typography color="text.secondary">Cart &gt;</Typography>
         <Typography color="text.secondary">Shipping &gt;</Typography>
         <Typography color="text.secondary">Payment &gt;</Typography>
         <Typography fontWeight="bold" color="primary">Place Order</Typography>
      </Box>

      {/* --- CSS GRID LAYOUT --- */}
      <Box sx={{ 
        display: 'grid', 
        // Mobile: 1 column. Desktop: Left col is 2 parts, Right col is 1 part (Filling 100%)
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
        gap: 4 
      }}>
        
        {/* LEFT COLUMN: Order Details */}
        <Box>
          {/* Shipping Info */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Shipping</Typography>
            <Typography>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city}{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </Typography>
          </Paper>

          {/* Payment Method */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Payment Method</Typography>
            <Typography>
              <strong>Method: </strong>
              {paymentMethod}
            </Typography>
          </Paper>

          {/* Order Items List */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Order Items</Typography>
            {cartItems.length === 0 ? (
              <Alert severity="info">Your cart is empty</Alert>
            ) : (
              <List>
                {cartItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar 
                          src={item.image} 
                          variant="rounded" 
                          sx={{ width: 56, height: 56, mr: 2 }} 
                          imgProps={{ referrerPolicy: "no-referrer" }} 
                        />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold">
                            <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              {item.name}
                            </Link>
                          </Typography>
                        }
                        secondary={`${item.qty} x $${item.price} = $${(item.qty * item.price).toFixed(2)}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Box>

        {/* RIGHT COLUMN: Order Summary */}
        <Box>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: '20px' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
              Order Summary
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Items</Typography>
              <Typography>${itemsPrice}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping</Typography>
              <Typography>${shippingPrice}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax</Typography>
              <Typography>${taxPrice}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">Total</Typography>
              <Typography variant="h6" fontWeight="bold">${totalPrice}</Typography>
            </Box>

            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              size="large"
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
          </Paper>
        </Box>

      </Box>
    </Container>
  );
};

export default PlaceOrder;