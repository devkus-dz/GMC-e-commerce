import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Container, Typography, Box, Alert, CircularProgress, 
  TextField, InputAdornment, IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search'; 
import axios from '../../utils/axiosConfig';
import useAuthStore from '../../store';

const UserList = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setUsers(data.items || []); 
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchUsers();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // Delete Handler
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        fetchUsers(); // Refresh list after delete
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  // Search Logic (Client-side)
  const filteredUsers = users.filter((user) => {
    if (!searchText) return true;
    const lowerText = searchText.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerText) || 
      user.email.toLowerCase().includes(lowerText)
    );
  });

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 100,
      renderCell: (params) => (
        params.value ? 
        <CheckIcon style={{ color: 'green' }} /> : 
        <CloseIcon style={{ color: 'red' }} />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => deleteHandler(params.row._id)}>
            <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Users</Typography>
        <TextField
          variant="outlined"
          placeholder="Search Name or Email..."
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: 300, bgcolor: 'white' }}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
          }}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
        <DataGrid
          rows={filteredUsers}
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

export default UserList;