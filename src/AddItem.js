import React, { useState } from 'react';
import './index.css'; // Import the CSS file
import * as XLSX from 'xlsx'; // Import the XLSX object using the * as XLSX syntax

function AddItem() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ sku: '', description: '', qty: '', skuValue: '' });
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [totalSkuValue, setTotalSkuValue] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (
      !newItem.sku ||
      !newItem.description ||
      isNaN(newItem.qty) ||
      isNaN(newItem.skuValue) ||
      newItem.qty <= 0 ||
      newItem.skuValue < 0
    ) {
      setError('Please fill in all fields and enter valid values for quantity and SKU value.');
      return;
    }

    setItems([...items, newItem]);
    setNewItem({ sku: '', description: '', qty: '', skuValue: '' });
    setError('');
    calculateTotalSkuValue();
    focusOnInput();
  };

  const handleEditItem = (index) => {
    const editedItem = items[index];
    setNewItem(editedItem);
    handleDeleteItem(index);
    focusOnInput();
  };

  const handleDeleteItem = (index) => {
    if (confirmDelete) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
      setConfirmDelete(false);
      calculateTotalSkuValue();
    } else {
      setConfirmDelete(true);
    }
  };

  const focusOnInput = () => {
    document.getElementById('sku-input').focus();
  };

  const calculateTotalSkuValue = () => {
    const total = items.reduce((acc, item) => acc + parseFloat(item.skuValue || 0), 0);
    setTotalSkuValue(total);
  };

  const exportToExcel = () => {
    const data = [
      ['SKU', 'Description', 'Quantity (QTY)', 'SKU Value'], // Excel headers
      ...items.map((item) => [item.sku, item.description, item.qty, item.skuValue]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Items'); // 'Items' is the sheet name

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'items.xlsx'; // The file name for the Excel download
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='divmainadditem'>
      <h2>Add Item Page</h2>
      <div>
        <input
          type="text"
          placeholder="SKU"
          name="sku"
          id="sku-input"
          value={newItem.sku}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={newItem.description}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Quantity (QTY)"
          name="qty"
          value={newItem.qty}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="SKU Value"
          name="skuValue"
          value={newItem.skuValue}
          onChange={handleChange}
        />
        <button onClick={handleAddItem}>Add Item</button>
        <button onClick={exportToExcel}>Export to Excel</button>
        {error && <p className="error">{error}</p>}
      </div>
      <table>
        <thead>
          <tr className='Insidecolorcol'>
            <th>SKU</th>
            <th>Description</th>
            <th>Quantity (QTY)</th>
            <th>SKU Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.sku}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>{item.skuValue}</td>
              <td>
                <button onClick={() => handleEditItem(index)}>Edit</button>
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
           {/* Continued from previous code */}
           </table>
      <p>Total SKU Value: {totalSkuValue}</p>
    </div>
  );
}

export default AddItem;

