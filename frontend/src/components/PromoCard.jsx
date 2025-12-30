import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PromoCard = ({ title, subtitle, image, link, priceTag }) => {
  return (
    <Box
      component={Link}
      to={link}
      sx={{
        textDecoration: 'none',
        color: 'white', 
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
        borderRadius: 4,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        height: '100%',
        width: '100%',
        p: 4, 
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { 
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
        }
      }}
    >
      <Box sx={{ maxWidth: '70%', zIndex: 2 }}>
        <Typography 
          variant="overline" 
          fontWeight="bold" 
          sx={{ 
            color: '#4fc3f7',
            letterSpacing: 1,
            textTransform: 'uppercase',
            mb: 0.5,
            display: 'block'
          }}
        >
          {priceTag}
        </Typography>

        <Typography 
          variant="h5" 
          fontWeight="900" 
          sx={{ 
            mb: 1, 
            lineHeight: 1.2,
            textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            opacity: 0.9,
            fontWeight: 500
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default PromoCard;