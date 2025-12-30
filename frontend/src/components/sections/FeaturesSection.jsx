import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined'; // For the circular arrows
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'; // For the shield
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'; // For the chat

const FeaturesSection = () => {

  const features = [
    {
      id: 1,
      icon: <RocketLaunchOutlinedIcon style={{ fontSize: 50 }} color='primary'/>,
      title: "Free Shipping",
      subtitle: "For all orders over $200"
    },
    {
      id: 2,
      icon: <SyncOutlinedIcon style={{ fontSize: 50 }} color='primary' />,
      title: "1 & 1 Returns",
      subtitle: "Cancellation after 1 day"
    },
    {
      id: 3,
      icon: <VerifiedUserOutlinedIcon style={{ fontSize: 50 }} color='primary' />,
      title: "100% Secure Payments",
      subtitle: "Guarantee secure payments"
    },
    {
      id: 4,
      icon: <ChatBubbleOutlineOutlinedIcon style={{ fontSize: 50 }} color='primary' />,
      title: "24/7 Dedicated Support",
      subtitle: "Anywhere & anytime"
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ my: 6 }}>
      <Box
        sx={{
          display: 'grid',
          // Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols
          gridTemplateColumns: {
            xs: '1fr', 
            sm: '1fr 1fr', 
            md: 'repeat(4, 1fr)' 
          },
          gap: 4,
          bgcolor: '#f9f9f9', 
          p: 4, 
          borderRadius: 2
        }}
      >
        {features.map((item) => (
          <Box 
            key={item.id} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' } 
            }}
          >
            {/* Icon Wrapper */}
            <Box sx={{ color: 'text.primary' }}>
              {item.icon}
            </Box>

            {/* Text Wrapper */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" lineHeight={1.2}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default FeaturesSection;