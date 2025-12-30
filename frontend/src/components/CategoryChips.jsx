import React, { useEffect, useState } from 'react';
import { Chip, Stack, CircularProgress, Alert } from '@mui/material';
import axios from '../utils/axiosConfig';

const CategoryChips = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
          
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else if (data.items && Array.isArray(data.items)) {
          setCategories(data.items);
        } else {
          // Fallback to empty array to prevent crash
          console.error("Unexpected data format", data);
          setCategories([]);
        }
  
        setLoading(false);
      } catch (err) {
        console.error("Failed to load categories", err);
        setError("Could not load categories");
        setCategories([]); 
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <CircularProgress size={24} sx={{ mb: 2 }} />;
  if (error) return null; 

  return (
    <Stack 
      direction="row" 
      spacing={1} 
      sx={{ 
        mb: 4, 
        justifyContent: 'center', 
        flexWrap: 'wrap', 
        gap: 1 
      }}
    >
      {/* "All" Chip to reset filter */}
      <Chip 
        label="All Products"
        clickable
        color={!selectedCategory ? "primary" : "default"}
        variant={!selectedCategory ? "filled" : "outlined"}
        onClick={() => onSelectCategory('')}
        sx={{ fontSize: '1rem', py: 2 }}
      />

      {/* Dynamic Category Chips */}
      {Array.isArray(categories) && categories.length > 0 && categories.map((cat) => (
      <Chip
        key={cat._id}
        label={cat.name}
        clickable
        color={selectedCategory === cat._id ? "primary" : "default"}
        variant={selectedCategory === cat._id ? "filled" : "outlined"}
        onClick={() => onSelectCategory(cat._id)}
        sx={{ fontSize: '1rem', py: 2 }}
      />
      ))}
    </Stack>
  );
};

export default CategoryChips;