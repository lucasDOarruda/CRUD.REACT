import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx'; // Import the xlsx library
import './index.css'; // Import the CSS file
import { Public } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'SKU', width: 150, editable: true },
  { field: 'lastName', headerName: 'Customer', width: 150, editable: true },
  { field: 'description', headerName: 'Description', width: 200, editable: true },
  { field: 'qty', headerName: 'Qty', type: 'number', width: 100, editable: true },
  { field: 'value', headerName: 'Value ($)', type: 'number', width: 150, editable: true },
  { field: 'shippingAddress', headerName: 'Shipping Address', width: 200, editable: true },
  { field: 'deliveryDate', headerName: 'Delivery Date', width: 150, editable: true },
  { field: 'notes', headerName: 'Notes', width: 200, editable: true },
];

function Logistic() {
  const initialState = {
    customer: '',
    sku: '',
    description: '',
    qty: 0,
    value: 0,
    shippingAddress: '',
    deliveryDate: '',
    notes: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [rows, setRows] = useState([]);
  const [nextId, setNextId] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddToTable = () => {
    const { customer, sku, description, qty, value, shippingAddress, deliveryDate, notes } = formData;
  
    if (customer && sku && description && qty >= 0 && value >= 0 && shippingAddress && deliveryDate) {
      const newRow = {
        id: nextId,
        firstName: sku, // Corrected here
        lastName: customer, // Corrected here
        description,
        qty,
        value,
        shippingAddress,
        deliveryDate,
        notes,
      };
      setRows([...rows, newRow]);
      setFormData(initialState);
      setNextId(nextId + 1);
    }
  };
  

  const handleDeleteSelected = () => {
    const selectedIds = rows.map((row) => row.id);
    const newRows = rows.filter((row) => !selectedIds.includes(row.id));
    setRows(newRows);
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Logistics Data');
    XLSX.writeFile(wb, 'logistics_data.xlsx');
  };

  return (
    <div>
      <h2 className='logistictitle' style={{ textAlign: 'center' }}>
        <Public fontSize="inherit" /> {/* Use the "public" icon */}
        Import & Export
      </h2>

      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '25ch',
            isplay: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignContent: 'center',
          },
        }}
        noValidate
        autoComplete="off"
      >
        {Object.entries(formData).map(([fieldName, fieldValue]) => (
          <TextField
            key={fieldName}
            id={fieldName}
            name={fieldName}
            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            variant="standard"
            type={fieldName === 'qty' || fieldName === 'value' ? 'number' : 'text'}
            value={fieldValue}
            onChange={handleInputChange}
          />
        ))}
      </Box>

      <br />
      <br />
      <br />

      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleAddToTable}>
          Add to Table
        </Button>

        <Button variant="contained" onClick={handleDeleteSelected}>
          Delete
        </Button>

        <Button variant="contained" onClick={handleExportToExcel}>
          Export
        </Button>
      </Stack>

      <br />
      <br />
      <br />

      <Box sx={{ height: 400, width: '100%', backgroundColor: 'rgba(224, 217, 206, 0.5)' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection disableRowSelectionOnClick />
      </Box>
    </div>
  );
}

export default Logistic;
