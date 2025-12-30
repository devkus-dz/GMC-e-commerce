import React from 'react';
import { Container, Box } from '@mui/material';
import FeaturesSection from '../components/sections/FeaturesSection'
import LatestProducts from '../components/sections/LatestProducts';
import FeaturedSection from '../components/sections/FeaturedSection'
import CTASection from '../components/sections/CTASection';

const HomePage = () => {

  return (
    <Box>

      <FeaturedSection />

      <Container maxWidth="xl">
        
        <FeaturesSection />
        <LatestProducts limit={8} />
        <CTASection />
        

      </Container>
    </Box>
  );
};

export default HomePage;