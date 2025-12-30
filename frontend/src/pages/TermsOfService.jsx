import React from 'react';
import { Container, Box, Typography, Paper, Alert, Divider } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      
      {/* HEADER SECTION */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Terms of Service
        </Typography>
      </Box>

      {/* CRITICAL DISCLAIMER - UPDATED */}
      <Alert 
        severity="warning" 
        icon={<WarningAmberIcon fontSize="inherit" />}
        sx={{ mb: 6, border: '1px solid #ed6c02', alignItems: 'center' }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Educational Project Disclaimer
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          This website is a <strong>demo project</strong> created for educational purposes as part of a Full Stack Development portfolio.
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Please note that this website and all the data are fake and just used to test the different components.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>NO REAL PRODUCTS ARE SOLD HERE.</strong> No payments are processed, and no physical goods will be shipped.
        </Typography>
      </Alert>

      {/* TERMS CONTENT */}
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
        
        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#1565c0' }}>
            1. Introduction
          </Typography>
          <Typography paragraph>
            Welcome to <strong>E-TECH Demo</strong>. By accessing this website, you agree that you understand this is a simulation 
            designed to demonstrate web development competencies using the MERN Stack (MongoDB, Express, React, Node.js).
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#1565c0' }}>
            2. Use of the Site
          </Typography>
          <Typography paragraph>
            You are permitted to use this website to test its functionality, including:
          </Typography>
          <ul>
            <li><Typography variant="body1">Browsing products and categories.</Typography></li>
            <li><Typography variant="body1">Creating a test account (please use fake data).</Typography></li>
            <li><Typography variant="body1">Adding items to the cart and simulating checkout.</Typography></li>
          </ul>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#1565c0' }}>
            3. Data & Privacy
          </Typography>
          <Typography paragraph>
            Any data you enter into this site (names, emails, addresses) is stored in a demonstration database. 
            While we implement standard security practices (like password hashing), <strong>we cannot guarantee the security of data 
            on this demo platform.</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
            Do not use your real passwords or real financial information.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#1565c0' }}>
            4. Intellectual Property
          </Typography>
          <Typography paragraph>
            The code for this project is open-source and available on my GitHub repository. 
            Product images and names used on this site are for demonstration purposes only and belong to their respective owners.
          </Typography>
        </Box>

      </Paper>
    </Container>
  );
};

export default TermsOfService;