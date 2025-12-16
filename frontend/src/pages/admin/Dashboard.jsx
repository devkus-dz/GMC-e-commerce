import React from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Card 1: Products */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#e3f2fd' }}
          >
            <Box>
              <Typography variant="h6" color="text.secondary">Total Products</Typography>
              <Typography variant="h3">12</Typography>
            </Box>
            <InventoryIcon sx={{ fontSize: 60, opacity: 0.5, color: '#1976d2' }} />
          </Paper>
        </Grid>

        {/* Card 2: Users */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#e8f5e9' }}
          >
            <Box>
              <Typography variant="h6" color="text.secondary">Total Users</Typography>
              <Typography variant="h3">5</Typography>
            </Box>
            <PeopleIcon sx={{ fontSize: 60, opacity: 0.5, color: '#2e7d32' }} />
          </Paper>
        </Grid>

        {/* Card 3: Orders */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#fff3e0' }}
          >
            <Box>
              <Typography variant="h6" color="text.secondary">Total Orders</Typography>
              <Typography variant="h3">1</Typography>
            </Box>
            <ShoppingCartIcon sx={{ fontSize: 60, opacity: 0.5, color: '#ed6c02' }} />
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions Area */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>Quick Actions</Typography>
        <Button variant="contained" sx={{ mr: 2 }}>Add New Product</Button>
        <Button variant="outlined">View All Orders</Button>
      </Box>
    </Box>
  );
};

export default Dashboard;