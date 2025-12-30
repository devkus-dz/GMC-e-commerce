import React from 'react';
import { Typography, Box } from '@mui/material';

export default function PageTitle({ title }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 4 }}>
      <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
      <Typography 
        variant="h4" 
        sx={{ 
          mx: 3, 
          fontWeight: 'bold', 
          textTransform: 'uppercase', 
          letterSpacing: 2,
          color: 'text.primary',
          textAlign: 'center' // Ensures text stays centered on small screens
        }}
      >
        {title}
      </Typography>
      <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
    </Box>
  );
}
