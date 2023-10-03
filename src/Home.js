import React, { useState } from 'react';
import './Home.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { orders } from './dummyData'; // Import the dummy data
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'clientName',
    headerName: 'Client Name',
    width: 150,
  },
  {
    field: 'sku',
    headerName: 'SKU',
    width: 110,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'qty',
    headerName: 'Qty',
    type: 'number',
    width: 90,
  },
  {
    field: 'value',
    headerName: 'Value',
    type: 'number',
    width: 110,
  },
];

function Home() {
  const [searchField, setSearchField] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Convert the searchField to lowercase for case-insensitive search
    const searchTerm = searchField.toLowerCase();

    // Filter orders based on whether the Client Name or SKU contains the search term
    const filtered = orders.filter(
      (order) =>
        order.clientName.toLowerCase().includes(searchTerm) ||
        order.sku.toLowerCase().includes(searchTerm)
    );

    // Update the filtered rows and toggle the table visibility
    setFilteredRows(filtered);
    setTableVisible(filtered.length > 0);
  };

  return (
    <div className="home-container">
      <container className="SUMMARY">
        <h2>Search ID 1 - 20 | Client Name A - T</h2>
      </container>

      <h2 className="h2home">Order Tracking</h2>

      {/* Search input */}
      <div className="search-container">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSearch}
        >
          <div>
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              variant="standard"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />



            <Button type="submit" sx={{ paddingTop: '3%' }}>
  Search
</Button>
            
          </div>
        </Box>
      </div>

      {/* Conditionally render the table based on visibility */}
      {tableVisible && (
        <div className="table-container">
          <Box sx={{ height: 400, width: '100%' ,backgroundColor: 'rgba(224, 217, 206, 0.5)'}}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      )}
    </div>
  );
}

export default Home;
