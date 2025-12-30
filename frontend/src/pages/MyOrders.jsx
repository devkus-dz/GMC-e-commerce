import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, Typography, Box, CircularProgress, Alert, Button, Chip 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import axios from '../utils/axiosConfig';
import useAuthStore from '../store';

const MyOrders = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [userInfo, navigate]);

  const columns = [
    { field: '_id', headerName: 'Order ID', width: 220 },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 150,
      valueFormatter: (value) => value ? value.substring(0, 10) : ''
    },
    { 
      field: 'totalPrice', 
      headerName: 'Total', 
      width: 130, 
      valueFormatter: (val) => `$${val}` 
    },
    {
      field: 'isPaid',
      headerName: 'Paid',
      width: 130,
      renderCell: (params) => (
        params.value 
          ? <Chip label="Paid" color="success" size="small" variant="outlined" />
          : <Chip label="Not Paid" color="error" size="small" variant="outlined" />
      ),
    },
    {
      field: 'isDelivered',
      headerName: 'Delivered',
      width: 130,
      renderCell: (params) => (
        params.value 
          ? <Chip label="Delivered" color="success" size="small" variant="outlined" />
          : <Chip label="Processing" color="warning" size="small" variant="outlined" />
      ),
    },
    {
      field: 'actions',
      headerName: 'Details',
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
          View
        </Button>
      ),
    },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Orders
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
        {orders.length === 0 ? (
           <Box sx={{ p: 4, textAlign: 'center' }}>
               <Typography variant="h6" color="text.secondary" gutterBottom>
                  You haven't placed any orders yet.
               </Typography>
               <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
                  Start Shopping
               </Button>
           </Box>
        ) : (
            <DataGrid
              rows={orders}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={10}
              rowsPerPageOptions={[10, 20]}
              disableSelectionOnClick
              rowHeight={60}
              sx={{ border: 0 }}
            />
        )}
      </Box>
    </Container>
  );
};

export default MyOrders;