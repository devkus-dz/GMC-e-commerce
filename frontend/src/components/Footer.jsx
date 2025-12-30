import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, IconButton, Grid, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#1a1a1a', color: 'white', pt: 8, pb: 4, mt: '50px' }}>
      <Container maxWidth="xl">
        
        {/* CSS GRID LAYOUT */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }, 
          gap: 4,
          mb: 5
        }}>
          
          {/* COLUMN 1: BRAND INFO */}
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#2196F3' }}>
            <span style={{color:'#fff'}}>E-</span>TECH
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500', mb: 2, maxWidth: 300 }}>
              The best destination for your tech needs. We provide high-quality electronics with the best warranty in the market.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook"><FacebookIcon /></IconButton>
              <IconButton color="inherit" aria-label="Twitter"><TwitterIcon /></IconButton>
              <IconButton color="inherit" aria-label="Instagram"><InstagramIcon /></IconButton>
              <IconButton color="inherit" aria-label="LinkedIn"><LinkedInIcon /></IconButton>
            </Box>
          </Box>

          {/* COLUMN 2: ACCOUNT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Account
            </Typography>
            <FooterLink to="/login">Login / Register</FooterLink>
            <FooterLink to="/cart">Shopping Cart</FooterLink>
            <FooterLink to="/myorders">My Orders</FooterLink>
          </Box>

          {/* COLUMN 3: SHOP */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Shop
            </Typography>
            <FooterLink to="/products">All Products</FooterLink>
          </Box>


          {/* COLUMN 4: COMPANY */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Support
            </Typography>
            <FooterLink to="/termes-of-service">Terms of Service</FooterLink>
          </Box>

        </Box>

        <Divider sx={{ bgcolor: 'grey.800', mb: 3 }} />

        {/* COPYRIGHT SECTION */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="grey.500">
            &copy; {new Date().getFullYear()} E-TECH. All rights reserved.
          </Typography>
          <Typography variant="body2" color="grey.500">
            Designed for Excellence.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

// Small helper component for consistent link styling
const FooterLink = ({ to, children }) => (
  <Link 
    to={to} 
    style={{ textDecoration: 'none', color: '#b0b0b0', fontSize: '0.9rem', marginBottom: '8px' }}
  >
    <span onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#b0b0b0'} style={{ transition: 'color 0.2s' }}>
      {children}
    </span>
  </Link>
);

export default Footer;