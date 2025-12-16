import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';

// Components
import Header from './components/Header';
import AdminRoute from './components/AdminRoute'; // <--- Import Guard

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard'; // <--- Import Dashboard
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <main style={{ padding: '20px 0' }}>
        <Container>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/403" element={<Forbidden />} />

            {/* 🔒 PROTECTED ADMIN ROUTES */}
            {/* Any route inside this wrapper is checked by AdminRoute.jsx */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>

            {/* Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;