import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';  
import Products from './pages/Products';  
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import OrderDetails from './pages/OrderDetails';
import MyOrders from './pages/MyOrders';          
import Forbidden from './pages/Forbidden';
import NotFound from './pages/NotFound';
import TermOfService from './pages/TermsOfService';

// Admin Pages
import Dashboard from './pages/admin/Dashboard'; 
import OrderList from './pages/admin/OrderList';
import UserList from './pages/admin/UserList';
import ProductList from './pages/admin/ProductList';

function App() {
  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      
      <Header />
      
      <Box component="main" sx={{ flexGrow: 1 }}>
            
        <Routes>
          {/* === PUBLIC ROUTES === */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/termes-of-service" element={<TermOfService />} />
          
          {/* === USER PROTECTED ROUTES === */}
          <Route path="/cart/:id?" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/myorders" element={<MyOrders />} />

          {/* === ADMIN PROTECTED ROUTES === */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orderlist" element={<OrderList />} />
            <Route path="/admin/userlist" element={<UserList />} />
            <Route path="/admin/productlist" element={<ProductList />} />
          </Route>

          {/* === CATCH ALL === */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;