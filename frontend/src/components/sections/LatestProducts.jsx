import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from '../../utils/axiosConfig';
import ProductCard from '../ProductCard'; 

const LatestProducts = ({ limit = 8, title = "New Arrivals" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        // Fetch products with the specific limit passed as prop
        const { data } = await axios.get(`/api/products?limit=${limit}&sort=-createdAt`);
        
        // Handle both response structures (array or paginated object)
        const items = Array.isArray(data) ? data : (data.items || []);
        
        setProducts(items);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, [limit]); // Re-fetch if the limit prop changes

  return (
    <Box sx={{ mb: 8 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ borderLeft: '5px solid #1565c0', pl: 2 }}>
          {title}
        </Typography>
        <Button component={Link} to="/products" endIcon={<ArrowForwardIcon />}>
          View All
        </Button>
      </Box>

      {/* Content Section */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: 3 
        }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LatestProducts;