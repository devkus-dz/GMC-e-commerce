import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const CTASection = () => {
  return (
    <Box
      sx={{
        mt: 10,
        mb: 6, 
        position: 'relative',
        borderRadius: { xs: 0, md: 4 }, 
        overflow: 'hidden',
        backgroundImage: `linear-gradient(to right, rgba(10, 25, 41, 0.9) 0%, rgba(10, 25, 41, 0.7) 100%), url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        boxShadow: 6
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="overline" 
          sx={{ 
            color: '#4fc3f7', 
            letterSpacing: 3, 
            fontWeight: 'bold',
            mb: 2,
            display: 'block'
          }}
        >
          Limitless Possibilities
        </Typography>

        <Typography 
          variant="h2" 
          fontWeight="900" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '2rem', md: '3.5rem' },
            lineHeight: 1.1
          }}
        >
          Ready to Upgrade Your <br />
          <Box component="span" sx={{ color: '#2196f3' }}>Digital Lifestyle?</Box>
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            mb: 5, 
            opacity: 0.9, 
            fontWeight: 'normal',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Join thousands of tech enthusiasts who trust us for the latest gear. 
          Enjoy <b>Free Shipping</b> on orders over $200 and our <b>30-day money-back guarantee</b>.
        </Typography>

        {/* Action Buttons */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
        >
          <Button 
            component={Link} 
            to="/products"
            variant="contained" 
            size="large"
            endIcon={<KeyboardArrowRightIcon />}
            sx={{
              bgcolor: '#2196f3',
              color: 'white',
              px: 5,
              py: 1.5,
              borderRadius: '50px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0 0 20px rgba(33, 150, 243, 0.5)', // Glowing effect
              '&:hover': {
                bgcolor: '#1976d2',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s'
            }}
          >
            Shop Now
          </Button>
          
          <Button 
            component={Link} 
            to="/register"
            variant="outlined" 
            size="large"
            sx={{
              borderColor: 'rgba(255,255,255,0.5)',
              color: 'white',
              px: 5,
              py: 1.5,
              borderRadius: '50px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              textTransform: 'none',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Create Account
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;