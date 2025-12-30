import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Container, Typography, Button, Box, Alert, CircularProgress, 
  TextField, InputAdornment 
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../../utils/axiosConfig';
import useAuthStore from '../../store';

const OrderList = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for Search Query
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const fetchOrders = async () => {
        try {
          const { data } = await axios.get('/api/orders', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setOrders(data);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || err.message);
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // Filter Logic (Derived State)
  const filteredOrders = orders.filter((order) => {
    if (!searchText) return true;

    const lowerText = searchText.toLowerCase();
    const orderId = order._id.toLowerCase();
    const userName = order.user?.name?.toLowerCase() || '';

    return orderId.includes(lowerText) || userName.includes(lowerText);
  });

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { 
      field: 'user', 
      headerName: 'User', 
      width: 150,
      valueGetter: (value, row) => row?.user?.name || 'Unknown User'
    },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 120,
      valueFormatter: (value) => value ? value.substring(0, 10) : ''
    },
    { field: 'totalPrice', headerName: 'Total', width: 100 },
    {
      field: 'isPaid',
      headerName: 'Paid',
      width: 100,
      renderCell: (params) => (
        params.value ? 
        <CheckIcon style={{ color: 'green' }} /> : 
        <CloseIcon style={{ color: 'red' }} />
      ),
    },
    {
      field: 'isDelivered',
      headerName: 'Delivered',
      width: 120,
      renderCell: (params) => (
        params.value ? 
        <CheckIcon style={{ color: 'green' }} /> : 
        <CloseIcon style={{ color: 'red' }} />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
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

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Orders
        </Typography>

        {/* Search Field UI */}
        <TextField
          variant="outlined"
          placeholder="Search by ID or Name..."
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: 300, bgcolor: 'white' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
        <DataGrid
          // Pass the filtered array instead of raw 'orders'
          rows={filteredOrders}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          sx={{ border: 0 }}
        />
      </Box>
    </Container>
  );
};

export default OrderList;