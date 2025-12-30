import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Container, Grid, Typography, Button, Box, 
  List, ListItem, Divider, Paper, Alert, CircularProgress,
  FormControl, Select, MenuItem, InputLabel 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from '../utils/axiosConfig';
import useAuthStore from '../store'; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useAuthStore(); // Get action from store

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1); // Local state for quantity selection

  const fallbackImage = 'https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg';
  const [imgSrc, setImgSrc] = useState(fallbackImage);

  const handleImgError = () => {
    if (imgSrc !== fallbackImage) setImgSrc(fallbackImage);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setImgSrc(data.image ? data.image : fallbackImage);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    // Dispatch action to Zustand store
    addToCart({ 
      ...product, 
      qty: Number(qty) // Append the selected quantity to the product object
    });
    
    // Redirect to Cart Page
    navigate('/cart');
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ mt: 4 }}>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 4 }}>
        Back to Products
      </Button>

      <Grid container spacing={5}>
        <Grid item md={6} xs={12}>
          <Box 
            component="img"
            src={imgSrc}
            alt={product.name}
            onError={handleImgError}
            referrerPolicy="no-referrer"
            sx={{ width: '100%', borderRadius: 2, boxShadow: 3, objectFit: 'cover', maxHeight: '500px' }}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <List>
            <ListItem disablePadding><Typography variant="h4" fontWeight="bold">{product.name}</Typography></ListItem>
            <Divider sx={{ my: 2 }} />
            <ListItem disablePadding><Typography variant="h5" color="primary" fontWeight="bold">Price: ${product.price}</Typography></ListItem>
            <Divider sx={{ my: 2 }} />
            <ListItem disablePadding><Typography variant="body1">{product.description}</Typography></ListItem>
          </List>

          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}><Typography>Price:</Typography></Grid>
              <Grid item xs={6}><Typography fontWeight="bold">${product.price}</Typography></Grid>
              <Grid item xs={12}><Divider /></Grid>
              
              <Grid item xs={6}><Typography>Status:</Typography></Grid>
              <Grid item xs={6}>
                <Typography color={product.countInStock > 0 ? 'success.main' : 'error.main'} fontWeight="bold">
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Typography>
              </Grid>
              <Grid item xs={12}><Divider /></Grid>

              {/* QUANTITY SELECTOR */}
              {product.countInStock > 0 && (
                <>
                  <Grid item xs={6}><Typography>Qty:</Typography></Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <Select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}><Divider /></Grid>
                </>
              )}

              <Grid item xs={12}>
                <Button 
                  onClick={addToCartHandler}
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  size="large"
                  disabled={product.countInStock === 0}
                  startIcon={<ShoppingCartIcon />}
                >
                  Add To Cart
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;