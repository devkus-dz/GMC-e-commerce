import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Box, Divider, 
  List, ListItem, ListItemAvatar, Avatar, ListItemText, 
  Alert, CircularProgress, Button 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from '../utils/axiosConfig';
import useAuthStore from '../store';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Loading states for action buttons
  const [loadingDeliver, setLoadingDeliver] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  // --- Fetch Order Data ---
  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setOrder(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchOrder();
    }
  }, [id, userInfo]);

  // --- Mark as Delivered ---
  const deliverHandler = async () => {
    setLoadingDeliver(true);
    try {
      await axios.put(`/api/orders/${order._id}/deliver`, {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setLoadingDeliver(false);
      fetchOrder(); // Refresh UI
    } catch (err) {
      alert(err.response?.data?.message || err.message);
      setLoadingDeliver(false);
    }
  };

  // --- Mark as Paid ---
  const payHandler = async () => {
    setLoadingPay(true);
    try {
      const paymentResult = {
        id: `COD_${order._id}`, 
        status: 'COMPLETED', 
        update_time: Date.now(), 
        email_address: order.user?.email 
      };
      await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setLoadingPay(false);
      fetchOrder(); // Refresh UI
    } catch (err) {
      alert(err.response?.data?.message || err.message);
      setLoadingPay(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Order {order._id}
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
         Placed on {order.createdAt?.substring(0, 10)}
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
        gap: 4,
        mt: 4
      }}>
        
        {/* LEFT COLUMN: Details */}
        <Box>
          {/* Shipping Info */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Shipping</Typography>
            <Typography sx={{ mb: 2 }}>
              <strong>Name: </strong> {order.user?.name} <br />
              <strong>Email: </strong> <a href={`mailto:${order.user?.email}`} style={{ textDecoration: 'none', color: '#1976d2' }}>{order.user?.email}</a> <br />
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </Typography>
            
            {order.isDelivered ? (
              <Alert severity="success">Delivered on {order.deliveredAt?.substring(0, 10)}</Alert>
            ) : (
              <Alert severity="error">Not Delivered</Alert>
            )}
          </Paper>

          {/* Payment Info */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Payment Method</Typography>
            <Typography sx={{ mb: 2 }}>
              <strong>Method: </strong> {order.paymentMethod}
            </Typography>
            
            {order.isPaid ? (
              <Alert severity="success">Paid on {order.paidAt?.substring(0, 10)}</Alert>
            ) : (
              <Alert severity="error">Not Paid</Alert>
            )}
          </Paper>

          {/* Order Items */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Order Items</Typography>
            <List>
              {order.orderItems.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar 
                        src={item.image} 
                        variant="rounded" 
                        sx={{ width: 56, height: 56, mr: 2 }} 
                        imgProps={{ referrerPolicy: "no-referrer" }} 
                      />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {item.name}
                          </Link>
                        </Typography>
                      }
                      secondary={`${item.qty} x $${item.price} = $${(item.qty * item.price).toFixed(2)}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>

        {/* RIGHT COLUMN: Summary & Admin Actions */}
        <Box>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: '20px' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
              Order Summary
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Items</Typography>
              <Typography>${order.itemsPrice}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping</Typography>
              <Typography>${order.shippingPrice}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax</Typography>
              <Typography>${order.taxPrice}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">Total</Typography>
              <Typography variant="h6" fontWeight="bold">${order.totalPrice}</Typography>
            </Box>

            {/* ADMIN ACTIONS SECTION */}
            {userInfo && userInfo.isAdmin && (
              <Box sx={{ mt: 3, borderTop: '1px dashed grey', pt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                    ADMIN ACTIONS
                  </Typography>

                  {/* Mark As Paid Toggle */}
                  <Button
                    variant={order.isPaid ? "outlined" : "outlined"}
                    color={order.isPaid ? "warning" : "success"}
                    fullWidth
                    sx={{ mb: 1 }}
                    onClick={payHandler}
                    disabled={loadingPay}
                  >
                    {loadingPay 
                      ? 'Processing...' 
                      : (order.isPaid ? 'Mark As Unpaid (Undo)' : 'Mark As Paid')
                    }
                  </Button>

                  {/* Mark As Delivered Toggle */}
                  <Button
                    variant="contained"
                    color={order.isDelivered ? "warning" : "primary"}
                    fullWidth
                    onClick={deliverHandler}
                    disabled={loadingDeliver}
                    sx={{ mb: 2 }}
                  >
                    {loadingDeliver 
                      ? 'Processing...' 
                      : (order.isDelivered ? 'Mark As Not Delivered (Undo)' : 'Mark As Delivered')
                    }
                  </Button>

                  <Divider />

                  {/* Back to Order List */}
                  <Button
                    variant="text"
                    color="inherit"
                    fullWidth
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/admin/orderlist')}
                    sx={{ mt: 1 }}
                  >
                    Back to Order List
                  </Button>
              </Box>
            )}
            
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderDetails;