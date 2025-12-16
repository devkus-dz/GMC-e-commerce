import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, CardMedia, CardContent, CardActions, 
  Typography, Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

const ProductCard = ({ product }) => {
  const temporaryImage = 'https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg';

  return (
    <Card 
      elevation={3} 
      sx={{ 
        width: '100%',      // Fill the grid slot
        maxWidth: '100%',   // ✅ NEVER exceed the grid slot
        height: '100%',     // Match height of neighbors
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
        image={temporaryImage}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Title: 'noWrap' is dangerous without minWidth constraint on parent, but safe now */}
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