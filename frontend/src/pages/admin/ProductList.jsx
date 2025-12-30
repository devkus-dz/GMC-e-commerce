import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Container, Typography, Button, Box, Alert, CircularProgress, 
  TextField, InputAdornment, IconButton, Avatar,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Paper, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search'; 
import axios from '../../utils/axiosConfig';
import useAuthStore from '../../store';

const ProductList = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  
  // --- Data States ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  // --- Modal States ---
  const [openForm, setOpenForm] = useState(false); 
  const [openDelete, setOpenDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // --- Form Data ---
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '', // Stores Category ID
    countInStock: 0,
    description: ''
  });

  // --- Fetch Data (Products & Categories) ---
  const fetchData = async () => {
    try {
      // Fetch both in parallel. 
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories') 
      ]);

      // Handle Products
      setProducts(productsRes.data.items || []);

      // Handle Categories (Robust check for Array vs Paginated Object)
      const catData = categoriesRes.data;
      if (Array.isArray(catData)) {
        setCategories(catData);
      } else if (catData.items) {
        setCategories(catData.items);
      } else {
        setCategories([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // --- Form Handlers ---
  const handleOpenCreate = () => {
    setIsEditMode(false);
    // Default state for new product
    setFormData({ 
      name: '', 
      price: 0, 
      image: '', 
      brand: '', 
      category: '', 
      countInStock: 0, 
      description: '' 
    });
    setOpenForm(true);
  };

  const handleOpenEdit = (row) => {
    setIsEditMode(true);
    setCurrentId(row._id);
    
    // Resolve Category ID: It might be an object (populated) or a string (ID)
    const categoryId = row.category && row.category._id 
        ? row.category._id 
        : row.category;

    setFormData({
      name: row.name,
      price: row.price,
      image: row.image,
      brand: row.brand?.name || row.brand || '',
      category: categoryId || '', 
      countInStock: row.countInStock,
      description: row.description
    });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      // Attach current admin user as the creator
      const payload = { ...formData, user: userInfo._id };

      if (isEditMode) {
        await axios.put(`/api/products/${currentId}`, payload, config);
      } else {
        await axios.post('/api/products', payload, config);
      }
      
      setOpenForm(false);
      fetchData(); // Refresh table
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // --- Delete Handlers ---
  const handleDeleteClick = (id) => {
    setCurrentId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/products/${currentId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setOpenDelete(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
      setOpenDelete(false);
    }
  };

  // --- Search Filter ---
  const filteredProducts = products.filter((product) => {
    if (!searchText) return true;
    const lowerText = searchText.toLowerCase();
    
    // Resolve category name for search
    let catName = '';
    if (product.category && product.category.name) {
        catName = product.category.name; // Populated
    } else if (product.category) {
        // Find name from our loaded categories list using ID
        const found = categories.find(c => c._id === product.category);
        if (found) catName = found.name;
    }

    return (
      product.name.toLowerCase().includes(lowerText) || 
      (product.brand?.name || product.brand || '').toLowerCase().includes(lowerText) ||
      catName.toLowerCase().includes(lowerText)
    );
  });

  // --- DataGrid Columns ---
  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    {
      field: 'image', headerName: 'Image', width: 70, sortable: false,
      renderCell: (params) => (
         <Avatar src={params.value} variant="rounded" sx={{ width: 40, height: 40 }} />
      ),
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 90, valueFormatter: (val) => `$${val}` },
    { 
      field: 'category', headerName: 'Category', width: 130,
      // Object Name OR Find in List OR fallback to ID
      valueGetter: (value, row) => {
        if(row.category?.name) return row.category.name; 
        const foundCat = categories.find(c => c._id === row.category);
        return foundCat ? foundCat.name : row.category;
      }
    },
    { 
      field: 'brand', headerName: 'Brand', width: 130,
      valueGetter: (value, row) => row.brand?.name || row.brand || ''
    },
    {
      field: 'actions', headerName: 'Actions', width: 120, sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleOpenEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteClick(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header & Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Products</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ width: 300, bgcolor: 'white' }}
              InputProps={{
                startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
              }}
            />
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
                Add Product
            </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {/* Data Table */}
      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          rowHeight={60}
          sx={{ border: 0 }}
        />
      </Box>
      
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
            {isEditMode ? 'Edit Product' : 'Create New Product'}
        </DialogTitle>
        <DialogContent dividers>
          
          <Box 
            component="form" 
            sx={{ 
                mt: 1,
                display: 'grid',
                // Responsive Grid: 1 col mobile, 2 cols desktop (2fr 1fr)
                gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
                gap: '20px',
                alignItems: 'start'
            }}
          >
              {/* === LEFT COLUMN === */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField 
                    label="Product Name" 
                    name="name" 
                    fullWidth required 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextField 
                        label="Brand" 
                        name="brand" 
                        fullWidth required 
                        value={formData.brand} 
                        onChange={handleChange} 
                    />
                    
                    {/* Category Dropdown */}
                    <FormControl fullWidth required>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        name="category"
                        value={formData.category} 
                        label="Category"
                        onChange={handleChange}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <TextField 
                    label="Description" 
                    name="description" 
                    fullWidth multiline 
                    rows={6}
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Enter product description..." 
                  />
              </Box>

              {/* === RIGHT COLUMN === */}
              <Paper elevation={3} sx={{ p: 2, bgcolor: '#fafafa', display: 'flex', flexDirection: 'column', gap: 2 }}>
                 {/* Image Preview Box */}
                 <Box sx={{ 
                    height: '200px', 
                    bgcolor: '#fff', 
                    border: '1px dashed grey', 
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                 }}>
                    {formData.image ? (
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                          onError={(e) => {e.target.src = "https://via.placeholder.com/200?text=Invalid+Image"}} 
                        />
                    ) : (
                        <Typography variant="caption" color="text.secondary">Preview</Typography>
                    )}
                 </Box>

                 <TextField 
                    label="Image URL" 
                    name="image" 
                    fullWidth required 
                    value={formData.image} 
                    onChange={handleChange} 
                    helperText="Paste image link here"
                    size="small"
                 />

                 <TextField 
                    label="Price ($)" 
                    name="price" 
                    type="number" 
                    fullWidth required 
                    value={formData.price} 
                    onChange={handleChange} 
                    InputProps={{ inputProps: { min: 0 } }} 
                 />

                 <TextField 
                    label="Stock Count" 
                    name="countInStock" 
                    type="number" 
                    fullWidth required 
                    value={formData.countInStock} 
                    onChange={handleChange} 
                    InputProps={{ inputProps: { min: 0 } }} 
                 />
              </Paper>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseForm} color="inherit" size="large">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" size="large" sx={{ px: 4 }}>
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* --- DELETE MODAL --- */}
       <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductList;