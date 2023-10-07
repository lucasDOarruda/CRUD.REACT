import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { orders } from '../dummyData'; // Import the dummy data
import Button from '@mui/material/Button';
import CustomBackdrop from '../Components/CustomBackdrop'; // Import the CustomBackdrop component




const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'clientName', headerName: 'Client Name', width: 150 },
  { field: 'sku', headerName: 'SKU', width: 110 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'qty', headerName: 'Qty', type: 'number', width: 90 },
  { field: 'value', headerName: 'Value', type: 'number', width: 110 },
];

function Home() {
  const [searchField, setSearchField] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    // Show the backdrop when the search is in progress
    setBackdropOpen(true);

    const searchTerm = searchField.toLowerCase();

    const filtered = orders.filter(
      (order) =>
        order.clientName.toLowerCase().includes(searchTerm) ||
        order.sku.toLowerCase().includes(searchTerm)
    );

    // Simulate an asynchronous operation (e.g., API call) with a delay
    setTimeout(() => {
      setFilteredRows(filtered);
      setTableVisible(filtered.length > 0);

      // Hide the backdrop when loading is done
      setBackdropOpen(false);
    }, 1000); // Adjust the delay as needed
  };

  return (
    <div className="home-container">
      {/* Add the CustomBackdrop component */}
      <CustomBackdrop open={backdropOpen} handleClose={() => setBackdropOpen(false)} />

      <div className="SUMMARY">
        <h2>Search ID 1 - 20 | Client Name A - T</h2>
      </div>

      <h2 className="h2home">Order Tracking</h2>

      <div className="search-container">
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
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

      {tableVisible && (
        <div className="table-container">
          <Box sx={{ height: 400, width: '100%', backgroundColor: 'rgba(224, 217, 206, 0.5)' }}>
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
