import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, Typography, Paper, Box, CircularProgress, Alert, Button, Chip 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import axios from '../../utils/axiosConfig';
import useAuthStore from '../../store';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    categories: 0
  });
  const [pendingOrders, setPendingOrders] = useState([]); // Store unpaid orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const fetchData = async () => {
        try {
          const [usersRes, productsRes, categoriesRes, ordersRes] = await Promise.all([
            axios.get('/api/users?limit=1', { headers: { Authorization: `Bearer ${userInfo.token}` } }),
            axios.get('/api/products?limit=1'),
            axios.get('/api/categories?limit=1'),
            // Fetch ALL orders
            axios.get('/api/orders', { headers: { Authorization: `Bearer ${userInfo.token}` } }) 
          ])

          // Check if 'items' exists (Paginated structure), otherwise use .data (Flat array)
          let allOrders = [];
          if (ordersRes.data.items) {
            allOrders = ordersRes.data.items;
          } else if (Array.isArray(ordersRes.data)) {
            allOrders = ordersRes.data;
          }
      
          // Check explicitly for false or undefined
          const unpaid = allOrders.filter(order => order.isPaid === false || !order.isPaid);
          
          setStats({
            users: usersRes.data.count || 0,
            products: productsRes.data.count || 0,
            categories: categoriesRes.data.count || 0,
            orders: ordersRes.data.count || allOrders.length 
          });
      
          setPendingOrders(unpaid);
          setLoading(false);
        } catch (err) {
          console.error("Dashboard Fetch Error:", err);
          setError(err.response?.data?.message || err.message);
          setLoading(false);
        }
      };
      fetchData();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // --- DataGrid Columns for Pending Orders ---
  const columns = [
    { field: '_id', headerName: 'Order ID', width: 220 },
    { 
      field: 'user', 
      headerName: 'Customer', 
      width: 180,
      valueGetter: (value, row) => row.user?.name || 'Guest'
    },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 120,
      valueFormatter: (value) => value ? value.substring(0, 10) : ''
    },
    { 
      field: 'totalPrice', 
      headerName: 'Total', 
      width: 120,
      valueFormatter: (value) => `$${value}`
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: () => (
        <Chip label="Not Paid" color="error" size="small" variant="outlined" />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/order/${params.row._id}`} 
          variant="contained"
          size="small"
          startIcon={<InfoIcon />}
        >
          Details
        </Button>
      ),
    },
  ];

  // Card Config
  const cards = [
    { title: 'Total Users', count: stats.users, icon: <PeopleIcon sx={{ fontSize: 40, color: '#1976d2' }} />, path: '/admin/userlist', color: '#e3f2fd' },
    { title: 'Total Products', count: stats.products, icon: <ShoppingBagIcon sx={{ fontSize: 40, color: '#2e7d32' }} />, path: '/admin/productlist', color: '#e8f5e9' },
    { title: 'Total Orders', count: stats.orders, icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#ed6c02' }} />, path: '/admin/orderlist', color: '#fff3e0' },
    { title: 'Categories', count: stats.categories, icon: <CategoryIcon sx={{ fontSize: 40, color: '#9c27b0' }} />, path: '/admin/productlist', color: '#f3e5f5' },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      {/* --- SECTION 1: STATS CARDS (CSS GRID) --- */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, 
        gap: 3,
        mb: 5
      }}>
        {cards.map((card, index) => (
          <Paper 
            key={index}
            elevation={3}
            sx={{ 
              p: 3, 
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              height: 180, borderRadius: 3, position: 'relative', overflow: 'hidden',
              transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' }
            }}
          >
            <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', bgcolor: card.color, zIndex: 0 }} />
            <Box sx={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
               <Box>
                  <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">{card.title.toUpperCase()}</Typography>
                  <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>{card.count}</Typography>
               </Box>
               {card.icon}
            </Box>
            <Button size="small" endIcon={<ArrowForwardIcon />} sx={{ alignSelf: 'flex-start', zIndex: 1 }} onClick={() => navigate(card.path)}>View Details</Button>
          </Paper>
        ))}
      </Box>

      {/* --- SECTION 2: PENDING ORDERS TABLE --- */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 2, color: '#d32f2f' }}>
           Pending Orders (Not Paid)
        </Typography>
        
        <Box sx={{ height: 400, width: '100%' }}>
          {pendingOrders.length > 0 ? (
            <DataGrid
              rows={pendingOrders}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableSelectionOnClick
              sx={{ border: 0 }}
            />
          ) : (
             <Alert severity="success">Great job! No pending orders.</Alert>
          )}
        </Box>
      </Paper>

    </Container>
  );
};

export default AdminDashboard;