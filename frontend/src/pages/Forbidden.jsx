import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import GppBadIcon from '@mui/icons-material/GppBad'; // Shield Icon

const Forbidden = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GppBadIcon sx={{ fontSize: 100, color: '#d32f2f', mb: 2 }} />
        
        <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#d32f2f' }}>
          403
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Access Denied
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          You do not have permission to view this page. This area is restricted to Administrators only.
        </Typography>

        <Button 
          component={Link} 
          to="/" 
          variant="outlined" 
          color="error"
          size="large"
          sx={{ mt: 3, px: 4, py: 1.5 }}
        >
          Return to Safe Zone
        </Button>
      </Box>
    </Container>
  );
};

export default Forbidden;