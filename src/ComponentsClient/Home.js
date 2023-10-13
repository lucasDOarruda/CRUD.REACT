import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { orders } from '../dummyData'; // Import the dummy data
import Button from '@mui/material/Button';
import CustomBackdrop from '../Components/CustomBackdrop'; // Import the CustomBackdrop component
import Card from '@mui/material/Card'; // Import Card component
import CardContent from '@mui/material/CardContent';
import '../Styles/Home.css';

// Function to get a random status
function getRandomStatus() {
  const statuses = [
    'Order Shipped',
    'Order Approved',
    'Order Declined',
    'Order last call for changes',
  ];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'clientName', headerName: 'Client Name', width: 150 },
  { field: 'sku', headerName: 'SKU', width: 110 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'qty', headerName: 'Qty', type: 'number', width: 90 },
  { field: 'value', headerName: 'Value', type: 'number', width: 110 },
  { field: 'status', headerName: 'Status', width: 160, valueGetter: () => getRandomStatus() },
  // Add the 'status' column with a valueGetter to get random statuses
];

const Home = () => {
  const [searchField, setSearchField] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [randomizedOrders, setRandomizedOrders] = useState([]);

  // Calculate the counts of each status
  const statusCounts = {};
  orders.forEach((order) => {
    const status = order.status;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  useEffect(() => {
    // Shuffle the order of rows to randomize them
    const shuffledOrders = [...orders];
    for (let i = shuffledOrders.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOrders[i], shuffledOrders[j]] = [shuffledOrders[j], shuffledOrders[i]];
    }
    setRandomizedOrders(shuffledOrders);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setBackdropOpen(true);

    const searchTerm = searchField.toLowerCase();

    const filtered = randomizedOrders.filter(
      (order) =>
        order.clientName.toLowerCase().includes(searchTerm) ||
        order.sku.toLowerCase().includes(searchTerm)
    );

    setTimeout(() => {
      setFilteredRows(filtered);
      setTableVisible(filtered.length > 0);
      setBackdropOpen(false);
    }, 1000);
  };

  return (
    <div className="home-container">
      <CustomBackdrop open={backdropOpen} handleClose={() => setBackdropOpen(false)} />

      <div className="SUMMARY">
        {/* Display Card components with status counts */}
        {Object.keys(statusCounts).map((status, index) => (
          <Card className="Order-Card" key={status}>
            <CardContent>
              {`${status}: ${statusCounts[status]}`}
              <div>
                <span>Total: $</span>
                {statusCounts[status] * 10} {/* Assuming each order is worth $10 */}
              </div>
            </CardContent>
          </Card>
        ))}
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
};

export default Home;
