import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import './index.css';
import { Public } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'productName', headerName: 'Product Name', width: 200, editable: true },
  { field: 'category', headerName: 'Category', width: 150, editable: true },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100, editable: true },
  { field: 'price', headerName: 'Price ($)', type: 'number', width: 150, editable: true },
  { field: 'unitCarton', headerName: 'Unit Carton', width: 150, editable: true },
  { field: 'ctnWeight', headerName: 'CTN Weight (lbs)', type: 'number', width: 150, editable: true },
  { field: 'ctnHeight', headerName: 'CTN Height (in)', type: 'number', width: 150, editable: true },
  { field: 'ctnWidth', headerName: 'CTN Width (in)', type: 'number', width: 150, editable: true },
];

function Inventory() {
  const initialState = {
    productName: '',
    category: '',
    quantity: 0,
    price: 0,
    unitCarton: '',
    ctnWeight: 0,
    ctnHeight: 0,
    ctnWidth: 0,
  };

  const [formData, setFormData] = useState(initialState);
  const [rows, setRows] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddToTable = () => {
    const { productName, category, quantity, price, unitCarton, ctnWeight, ctnHeight, ctnWidth } = formData;

    if (productName && category && quantity >= 0 && price >= 0 && unitCarton && ctnWeight >= 0 && ctnHeight >= 0 && ctnWidth >= 0) {
      const newRow = { id: nextId, productName, category, quantity, price, unitCarton, ctnWeight, ctnHeight, ctnWidth };
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
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory Data');
    XLSX.writeFile(wb, 'inventory_data.xlsx');
  };

  const handleSearch = () => {
    const filteredData = rows.filter((row) => {
      const values = Object.values(row).map((value) => value.toString().toLowerCase());
      return values.some((value) => value.includes(searchTerm.toLowerCase()));
    });
    setFilteredRows(filteredData);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredRows([]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleImportFromExcel = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const importedData = XLSX.utils.sheet_to_json(sheet);

        // Add the imported data to the existing rows
        setRows([...rows, ...importedData]);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return (
    <div>
      <h2 className='inventorytitle' style={{ textAlign: 'center' }}>
        Inventory Management
      </h2>

      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '25ch',
            textAlign: 'center',
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
            type={
              fieldName === 'quantity' || fieldName === 'price' || fieldName === 'ctnWeight' || fieldName === 'ctnHeight' || fieldName === 'ctnWidth'
                ? 'number'
                : 'text'
            }
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

        {/* Add the Import button and file input */}
        <Button variant="contained" onClick={handleImportFromExcel}>
          Import from Excel
        </Button>

        <input type="file" accept=".xlsx" onChange={handleFileChange} style={{ display: 'none' }} id="excelFileInput" />
        <label htmlFor="excelFileInput">
          <Button variant="contained" component="span">
            Upload Excel File
          </Button>
        </label>
      </Stack>

      <br />
      <br />
      <br />

      <Box sx={{ height: 400, width: '100%', backgroundColor: 'rgba(224, 217, 206, 0.5)' }}>
        <DataGrid rows={filteredRows.length > 0 ? filteredRows : rows} columns={columns} pageSize={5} checkboxSelection disableRowSelectionOnClick />
      </Box>
    </div>
  );
}

export default Inventory;
