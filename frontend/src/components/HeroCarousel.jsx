import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {

  const items = [
    {
      id: "694c7f2bed744350664f902f",
      title: "",
      tagline: "LIMITED EDITION",
      desc: "Ultra graphics and gaming experience.",
      image: "https://d18qa1zi1lagoc.cloudfront.net/articles/ShpxKcKa6PUyvXDHh2LjLXYrXDfKtGy8Mw7GfslL.png", 
      tint: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)",
    },
    {
      id: "694c7f2bed744350664f9034",
      title: "MacBook Pro M1",
      tagline: "POWER DEFINED",
      desc: "Mind-blowing performance for pros.",
      image: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=2078&auto=format&fit=crop",
      tint: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)",
    }
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <Carousel

      index={activeStep}           
      onChange={(index) => setActiveStep(index)} 
      next={handleNext}            
      prev={handlePrev}           
      autoPlay={true}            
      // --------------------------------
      
      animation="fade"
      duration={800}
      indicators={true}
      navButtonsAlwaysVisible={true}
      height="100%"
      sx={{ flexGrow: 1, height: '100%', borderRadius: 4, overflow: 'hidden' }}
    >
      {items.map((item) => (
        <Paper
          key={item.id}
          sx={{
            backgroundImage: `${item.tint}, url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            height: '100%',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 4, md: 8 },
          }}
          elevation={0}
        >
          <Box sx={{ maxWidth: { xs: '100%', md: '600px' } }}>
            <Typography 
              variant="overline" 
              sx={{ letterSpacing: 3, fontWeight: 'bold', color: '#4fc3f7' }}
            >
              {item.tagline}
            </Typography>
            
            <Typography 
              variant="h2" 
              fontWeight="900" 
              sx={{ 
                mt: 1, 
                mb: 2, 
                fontSize: { xs: '2.5rem', md: '4rem'}, 
                lineHeight: 1.1 
              }}
            >
              {item.title}
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 'normal' }}>
              {item.desc}
            </Typography>
            
            <Button
              component={Link}
              to={`/product/${item.id}`}
              variant="contained"
              size="large"
              sx={{
                borderRadius: '30px',
                px: 5, py: 1.5,
                fontSize: '1.1rem',
                bgcolor: '#2196f3',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 4px 14px 0 rgba(33, 150, 243, 0.35)',
                '&:hover': { bgcolor: '#1976d2' }
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Paper>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;