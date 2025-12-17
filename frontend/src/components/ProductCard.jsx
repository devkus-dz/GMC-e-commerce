import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, CardMedia, CardContent, CardActions, 
  Typography, Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

const ProductCard = ({ product }) => {
  // RELIABLE FALLBACK: The generic food image you liked
  const fallbackImage = 'https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg';

  // 1. Initialize state
  // If product.image is missing/empty, start with fallback immediately
  const [imgSrc, setImgSrc] = useState(product.image ? product.image : fallbackImage);

  // 2. Handle 404 / Broken Links
  const handleImgError = () => {
    // Only switch if we aren't already showing the fallback (Prevents infinite loops)
    if (imgSrc !== fallbackImage) {
      setImgSrc(fallbackImage);
    }
  };

  // 3. Reset state if the product prop changes (e.g. during pagination)
  useEffect(() => {
    setImgSrc(product.image ? product.image : fallbackImage);
  }, [product.image]);

  return (
    <Card 
      elevation={3} 
      sx={{ 
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imgSrc}
        alt={product.name}
        referrerPolicy="no-referrer"
        onError={handleImgError} // <--- Triggers switch if URL fails
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap sx={{ fontWeight: 'bold' }}>
          {product.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            height: '40px'
          }}
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
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;