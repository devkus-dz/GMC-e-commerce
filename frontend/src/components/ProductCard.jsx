import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, CardMedia, CardContent, CardActions, 
  Typography, Button, Snackbar, Alert 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import useAuthStore from '../store';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useAuthStore();
  const [open, setOpen] = useState(false); 

  const fallbackImage = 'https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg';
  const [imgSrc, setImgSrc] = useState(product.image ? product.image : fallbackImage);

  const handleImgError = () => {
    if (imgSrc !== fallbackImage) setImgSrc(fallbackImage);
  };

  useEffect(() => {
    setImgSrc(product.image ? product.image : fallbackImage);
  }, [product.image]);

  const addToCartHandler = () => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.qty + 1 : 1;

    if (quantity > product.countInStock) {
      alert('Sorry, out of stock limit reached.');
      return;
    }

    addToCart({ ...product, qty: quantity });
    setOpen(true); 
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <Card 
        elevation={3} 
        sx={{ width: '100%', maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)', boxShadow: 6 } }}
      >
        <CardMedia
          component="img"
          height="200"
          image={imgSrc}
          alt={product.name}
          onError={handleImgError}
          referrerPolicy="no-referrer"
          sx={{ objectFit: 'cover' }}
        />
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="div" noWrap sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, height: '40px' }}
          >
            {product.description}
          </Typography>

          <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mt: 'auto' }}>
            ${product.price}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button 
            size="small" 
            variant="outlined" 
            startIcon={<InfoIcon />}
            component={Link}
            to={`/product/${product._id}`}
          >
            Details
          </Button>
          
          <Button 
            size="small" 
            variant="contained" 
            color="secondary"
            startIcon={<ShoppingCartIcon />}
            disabled={product.countInStock === 0}
            onClick={addToCartHandler}
          >
            Add
          </Button>
        </CardActions>
      </Card>

      {/* SUCCESS NOTIFICATION */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Item added to cart! Go to Cart to checkout.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;