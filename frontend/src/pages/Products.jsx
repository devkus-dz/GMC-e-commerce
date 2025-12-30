import React, { useState, useEffect } from 'react';
import { Typography, Pagination, Box, CircularProgress, Alert, Container } from '@mui/material';
import axios from '../utils/axiosConfig';
import ProductCard from '../components/ProductCard';
import CategoryChips from '../components/CategoryChips';
import PageTitle from '../components/PageTitle';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  
  // Category State
  const [category, setCategory] = useState(''); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/products?pageNumber=${page}&limit=12&category=${category}`
        );
        
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
  }, [page, category]); // Add category to dependency array

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handler for Category Click
  const handleCategorySelect = (id) => {
    setCategory(id);
    setPage(1); // Reset to first page when filter changes
  };

  return (
    <Container maxWidth="xl">
      
      <PageTitle title="Our Products" />

      {/*  Category Chips */}
      <CategoryChips 
        selectedCategory={category} 
        onSelectCategory={handleCategorySelect} 
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {/* Check for empty results */}
          {products.length === 0 && (
             <Alert severity="info" sx={{ mt: 2, justifyContent: 'center' }}>
                No products found in this category.
             </Alert>
          )}

          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(4, 1fr)'
              },
              gap: 3,
            }}
          >
            {products.map((product) => (
              <Box key={product._id} sx={{ minWidth: 0 }}> 
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        </>
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