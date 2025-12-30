import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Button, Box, Card, 
  CardMedia, Select, MenuItem, IconButton, Divider, Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PageTitle from '../components/PageTitle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import useAuthStore from '../store';

// ---------------------------------------------------------
// Handles the image fallback for a single row
// ---------------------------------------------------------
const CartItemImage = ({ item }) => {
  const fallbackImage = 'https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg';
  const [imgSrc, setImgSrc] = useState(item.image ? item.image : fallbackImage);

  const handleImgError = () => {
    if (imgSrc !== fallbackImage) setImgSrc(fallbackImage);
  };

  return (
    <CardMedia
      component="img"
      image={imgSrc}
      alt={item.name}
      onError={handleImgError}
      referrerPolicy="no-referrer"
      sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1, mr: 2 }}
    />
  );
};

// ---------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useAuthStore();

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>

      <PageTitle  title="Shopping Cart"/>

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Button component={Link} to="/products" variant="contained" sx={{ mt: 2 }}>
            Go Shopping
          </Button>
        </Paper>
      ) : (
        /* CSS GRID CONTAINER */
        <Box 
          sx={{
            display: 'grid',
            // Mobile: 1 column, Desktop: 2 columns (2fr space for items, 1fr for subtotal)
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
            gap: 4, // 32px gap
            alignItems: 'start' // Keeps subtotal at the top even if list is long
          }}
        >
          
          {/* COLUMN 1: Cart Items List */}
          <Box>
            {cartItems.map((item) => (
              <Card key={item._id} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center' }}>
                
                {/* USE HELPER COMPONENT HERE */}
                <CartItemImage item={item} />
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component={Link} to={`/product/${item._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">${item.price}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Select
                    size="small"
                    value={item.qty}
                    onChange={(e) => addToCart({ ...item, qty: Number(e.target.value) })}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                    ))}
                  </Select>

                  <IconButton color="error" onClick={() => removeFromCart(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>

          {/* COLUMN 2: Subtotal Card */}
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </Typography>
            
            <Typography variant="h5" fontWeight="bold" color="primary">
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              size="large"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              startIcon={<ShoppingBagIcon />}
            >
              Proceed to Checkout
            </Button>
          </Paper>
          
        </Box>
      )}
    </Container>
  );
};

export default Cart;