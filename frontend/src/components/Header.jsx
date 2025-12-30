import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// 1. Import useTheme to access your primary color
import { useTheme } from '@mui/material/styles'; 
import { 
  AppBar, Toolbar, Typography, Button, Box, Badge, Container, 
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider 
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LocalShipping, ShoppingBag } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CloseIcon from '@mui/icons-material/Close';

import useAuthStore from '../store';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, logout, cartItems } = useAuthStore();
  
  // Access the theme variables
  const theme = useTheme(); 

  const activeColor = theme.palette.primary.light; 

  // Mobile Menu State
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = () => {
    setMobileOpen(false); 
    navigate('/');
    setTimeout(() => {
      logout();
    }, 100);
  };

  const getNavStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? activeColor : 'inherit',
      fontWeight: isActive ? 'bold' : 'normal',
      borderBottom: isActive ? `3px solid ${activeColor}` : '3px solid transparent',
      borderRadius: 0, 
      px: 2, 
      transition: 'all 0.3s ease',
      '&:hover': {
        color: activeColor,
        backgroundColor: `${activeColor}15`,
        borderBottom: `3px solid ${activeColor}`
      }
    };
  };

  // --- MENU ITEMS CONFIGURATION ---
  const adminLinks = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/userlist' },
    { text: 'Products', icon: <InventoryIcon />, path: '/admin/productlist' },
    { text: 'Orders', icon: <ListAltIcon />, path: '/admin/orderlist' },
  ];

  // --- MOBILE DRAWER CONTENT ---
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
         <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
         </IconButton>
      </Box>
      <Divider />
      
      <List>
        {/* ADMIN LINKS */}
        {userInfo && userInfo.isAdmin && adminLinks.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.path} 
              onClick={handleDrawerToggle}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  bgcolor: `${theme.palette.primary.main}15`
                },
                '&.Mui-selected:hover': {
                  bgcolor: `${theme.palette.primary.main}25`
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? theme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* USER LINKS */}
        {(userInfo && !userInfo.isAdmin) && (
           <ListItem disablePadding>
             <ListItemButton 
                component={Link} 
                to="/myorders" 
                onClick={handleDrawerToggle}
                selected={location.pathname === "/myorders"}
                sx={{
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                      bgcolor: `${theme.palette.primary.main}15`
                    }
                }}
             >
               <ListItemIcon sx={{ color: location.pathname === "/myorders" ? theme.palette.primary.main : 'inherit' }}><LocalShipping /></ListItemIcon>
               <ListItemText primary="My Orders" />
             </ListItemButton>
           </ListItem>
        )}

        {/* SHOP & CART */}
        {(!userInfo || !userInfo.isAdmin) && (
          <>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/products" 
                onClick={handleDrawerToggle}
                selected={location.pathname === "/products"}
                sx={{
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                      bgcolor: `${theme.palette.primary.main}15`
                    }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === "/products" ? theme.palette.primary.main : 'inherit' }}><ShoppingBag /></ListItemIcon>
                <ListItemText primary="Shop" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/cart" 
                onClick={handleDrawerToggle}
                selected={location.pathname === "/cart"}
                sx={{
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                      bgcolor: `${theme.palette.primary.main}15`
                    }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === "/cart" ? theme.palette.primary.main : 'inherit' }}>
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      
      <Divider />

      {/* AUTH LINKS */}
      <List>
        {userInfo ? (
          <ListItem disablePadding>
            <ListItemButton onClick={logoutHandler}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/login" 
                onClick={handleDrawerToggle}
                selected={location.pathname === "/login"}
                sx={{
                    '&.Mui-selected': { color: theme.palette.primary.main }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === "/login" ? theme.palette.primary.main : 'inherit' }}><LoginIcon /></ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/register" 
                onClick={handleDrawerToggle}
                selected={location.pathname === "/register"}
                sx={{
                    '&.Mui-selected': { color: theme.palette.primary.main }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === "/register" ? theme.palette.primary.main : 'inherit' }}><LoginIcon /></ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" style={{ background: '#203040' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* ==================== LOGO ==================== */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography 
              component={Link} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ color: theme.palette.primary.light }}>
              <span style={{color:'#fff'}}>E-</span>TECH
              </Typography>
              {userInfo?.isAdmin ? <span style={{fontSize: '0.7em', marginLeft: '5px', opacity: 0.8, color: '#fff'}}>(Admin)</span> : ''}
            </Typography>
          </Box>

          {/* ==================== DESKTOP MENU ==================== */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1 }}>
            
            {/* Admin Links */}
            {userInfo && userInfo.isAdmin && adminLinks.map((item) => (
                <Button 
                  key={item.text} 
                  component={Link} 
                  to={item.path} 
                  sx={getNavStyle(item.path)} 
                >
                  <span style={{ marginRight: '8px', display: 'flex' }}>{item.icon}</span> 
                  {item.text}
                </Button>
            ))}

            {/* User Links */}
            {(userInfo && !userInfo.isAdmin) && (
              <Button component={Link} to="/myorders" sx={getNavStyle('/myorders')}>
                <LocalShipping sx={{ mr: 1 }} /> My Orders
              </Button>
            )}

            {/* Public Links */}
            {(!userInfo || !userInfo.isAdmin) && (
              <>
                <Button component={Link} to="/products" sx={getNavStyle('/products')}>
                  <ShoppingBag sx={{ mr: 1 }} /> Shop
                </Button>
                
                <Button component={Link} to="/cart" sx={getNavStyle('/cart')}>
                  <Badge badgeContent={cartItems.length} color="secondary" sx={{ mr: 1 }}>
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </Button>
              </>
            )}
          </Box>

          {/* ==================== DESKTOP AUTH ==================== */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {userInfo ? (
              <Button color="inherit" onClick={logoutHandler} startIcon={<LogoutIcon />} sx={{ '&:hover': { color: '#ef5350' } }}>
                Logout
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button component={Link} to="/login" sx={getNavStyle('/login')}>
                   Sign In
                </Button>
                <Button 
                  component={Link} 
                  to="/register" 
                  variant="outlined" 
                  sx={{ 
                    borderColor: location.pathname === '/register' ? activeColor : 'rgba(255,255,255,0.5)', 
                    color: location.pathname === '/register' ? activeColor : 'inherit',
                    whiteSpace: 'nowrap',
                    '&:hover': { borderColor: activeColor, color: activeColor }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>

          {/* ==================== MOBILE HAMBURGER ==================== */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
             <IconButton
               size="large"
               onClick={handleDrawerToggle}
               color="inherit"
             >
               <MenuIcon />
             </IconButton>
             
             <Drawer
               anchor="right"
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{ keepMounted: true }}
             >
               {drawerContent}
             </Drawer>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;