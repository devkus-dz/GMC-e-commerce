import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, Grid, Typography, Button, Box, 
  List, ListItem, ListItemText, Divider, Paper, Alert, CircularProgress 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- IMAGE HANDLING LOGIC START ---
  const fallbackImage = 'https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg';
  const [imgSrc, setImgSrc] = useState(fallbackImage);

  const handleImgError = () => {
    if (imgSrc !== fallbackImage) {
      setImgSrc(fallbackImage);
    }
  };
  // --- IMAGE HANDLING LOGIC END ---

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        
        // Update image state once data arrives
        // If data.image is empty, use fallback immediately
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
    console.log('Added to cart:', product.name);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Container sx={{ mt: 5 }}>
       <Alert severity="error">{error}</Alert>
       <Button component={Link} to="/" sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
         Go Back
       </Button>
    </Container>
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 4 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={5}>
        {/* LEFT COLUMN: Product Image */}
        <Grid item md={6} xs={12}>
          <Box 
            component="img"
            src={imgSrc}            // ✅ Uses state (Real Image or Fallback)
            alt={product.name}
            onError={handleImgError} // ✅ Safety Trigger
            referrerPolicy="no-referrer"
            sx={{ 
              width: '100%', 
              borderRadius: 2, 
              boxShadow: 3,
              objectFit: 'cover',   // Ensures image looks good
              maxHeight: '500px'    // Prevents it from being too tall on large screens
            }}
          />
        </Grid>

        {/* RIGHT COLUMN: Info & Cart Actions */}
        <Grid item md={6} xs={12}>
          <List>
            <ListItem disablePadding>
              <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
            </ListItem>
            
            <Divider sx={{ my: 2 }} />

            <ListItem disablePadding>
              <Typography variant="h5" color="primary" fontWeight="bold">
                Price: ${product.price}
              </Typography>
            </ListItem>

            <Divider sx={{ my: 2 }} />

            <ListItem disablePadding>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {product.description}
              </Typography>
            </ListItem>
          </List>

          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography>Price:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="bold">${product.price}</Typography>
              </Grid>

              <Grid item xs={12}><Divider /></Grid>

              <Grid item xs={6}>
                <Typography>Status:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color={product.countInStock > 0 ? 'success.main' : 'error.main'} fontWeight="bold">
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Typography>
              </Grid>

              <Grid item xs={12}><Divider /></Grid>

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