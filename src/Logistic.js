import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DateRangeIcon from '@mui/icons-material/DateRange'; // Import DateRangeIcon
import * as XLSX from 'xlsx'; // Import the xlsx library
import './index.css'; // Import the CSS file
import { Public } from '@mui/icons-material';
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'SKU',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Customer',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    editable: true,
  },
  {
    field: 'qty',
    headerName: 'Qty',
    type: 'number',
    width: 100,
    editable: true,
  },
  {
    field: 'value',
    headerName: 'Value ($)',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'shippingAddress',
    headerName: 'Shipping Address',
    width: 200,
    editable: true,
  },
  {
    field: 'deliveryDate',
    headerName: 'Delivery Date',
    width: 150,
    editable: true,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 200,
    editable: true,
  },
];

function Logistic() {
    const [rows, setRows] = useState([]);
    const [customer, setCustomer] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [qty, setQty] = useState(0);
    const [value, setValue] = useState(0);
    const [shippingAddress, setShippingAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [notes, setNotes] = useState('');
    const [nextId, setNextId] = useState(1);

  const handleAddToTable = () => {
    if (customer && sku && description && qty >= 0 && value >= 0 && shippingAddress && deliveryDate) {
      const newRow = {
        id: nextId,
        lastName: customer,
        firstName: sku,
        description,
        qty,
        value,
        shippingAddress,
        deliveryDate,
        notes,
      };
      setRows([...rows, newRow]);
      setCustomer('');
      setSku('');
      setDescription('');
      setQty(0);
      setValue(0);
      setShippingAddress('');
      setDeliveryDate('');
      setNotes('');
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
        <Public fontSize="inherit"/> {/* Use the "public" icon */}
        Import & Export
      </h2>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch', isplay: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly', // Space items evenly horizontally
          alignItems: 'center',alignContent: 'center'}
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="customer"
          label="Customer"
          variant="standard"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <TextField
          id="sku"
          label="SKU"
          variant="standard"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="qty"
          label="Qty"
          variant="standard"
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <TextField
          id="value"
          label="Value ($)"
          variant="standard"
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <TextField
          id="shippingAddress"
          label="Shipping Address"
          variant="standard"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <TextField
          id="deliveryDate"
          label="Delivery Date"
          variant="standard"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
        <TextField
          id="notes"
          label="Notes"
          variant="standard"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Box>
      
<br/>
<br/>
<br/>

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
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default Logistic;
