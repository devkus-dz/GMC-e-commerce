import React from 'react';
import { Box, Container } from '@mui/material';
import HeroCarousel from '../HeroCarousel';
import PromoCard from '../PromoCard';

const FeaturedSection = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          // Mobile: Auto height, Desktop: Fixed 600px height
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gridTemplateRows: { xs: 'auto', md: '600px' }, 
        }}
      >
        
        {/* Left Column: Carousel (Takes 100% of the 600px) */}
        <Box sx={{ height: '100%', minHeight: { xs: '400px', md: 'auto' } }}>
           <HeroCarousel />
        </Box>

        {/* Right Column: Stacked Cards */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            height: '100%'
          }}
        >

          <Box sx={{ flex: 1 }}>
            <PromoCard
              title="GoPro HERO10 Black"
              subtitle="Ultra quality for extreme sports"
              priceTag="Save up to $80"
              bgColor="#E3F2FD"
              image="https://static.gopro.com/assets/blta2b8522e5372af40/blt6ff9ada3eca94bbc/643ee100b1f4db27b0203e9d/pdp-h10-image01-1920-2x.png"
              link="/product/694c7f2bed744350664f902d"
            />
          </Box>


          <Box sx={{ flex: 1 }}>
            <PromoCard
              title="Samsung Galaxy Z Fold 3"
              subtitle="The new era of mobile AI"
              priceTag="Save up to $200"
              bgColor="#de78f0"
              image="https://img.global.news.samsung.com/be_fr/wp-content/uploads/2021/08/Galaxy-Z-Fold3-5g-43-scaled-796x563.jpg"
              link="/product/694c7f2bed744350664f9024"
            />
          </Box>
        </Box>

      </Box>
    </Container>
  );
};

export default FeaturedSection;