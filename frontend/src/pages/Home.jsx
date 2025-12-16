import React, { useState, useEffect } from 'react';
import { Typography, Pagination, Box, CircularProgress, Alert, Container } from '@mui/material'; // Removed Grid
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/products?pageNumber=${page}&limit=12`);
        setProducts(data.items);
        setPages(data.pages);
        setPage(data.page);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 4, mt: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Latest Products
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        /* ✅ CSS GRID LAYOUT - The Robust Solution */
        <Box 
          sx={{
            display: 'grid',
            // Define columns for each breakpoint explicitly
            gridTemplateColumns: {
              xs: '1fr',                // Mobile: 1 column
              sm: '1fr 1fr',            // Tablet: 2 columns
              md: '1fr 1fr 1fr',        // Small Laptop: 3 columns
              lg: 'repeat(4, 1fr)',     // Desktop: 4 columns
              xl: 'repeat(4, 1fr)'      // 2K Screen: 4 columns
            },
            gap: 3, // Spacing between grid items (equivalent to spacing={3})
          }}
        >
          {products.map((product) => (
            // No <Grid item> needed here, the Box handles the slots
            <Box key={product._id} sx={{ minWidth: 0 }}> 
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      )}

      {pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
          <Pagination 
            count={pages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            size="large"
            showFirstButton 
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default Home;