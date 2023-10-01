import React, { useState } from 'react';
import './index.css'; // Import the CSS file

import { writeFileSync } from 'xlsx';
import * as XLSX from 'xlsx'; // Import the XLSX object using the * as XLSX syntax

import { RiFileExcel2Line } from 'react-icons/ri'; // Import the Excel icon

const OrderEntry = () => {
  // Initialize state to manage order entries
  const [orderEntries, setOrderEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    sku: '',
    description: '',
    qty: '',
    price: '',
    deliveryDate: '',
  });

  // Function to add a new order entry
  const addOrderEntry = () => {
    if (
      newEntry.sku.trim() === '' ||
      newEntry.description.trim() === '' ||
      newEntry.qty.trim() === '' ||
      newEntry.price.trim() === '' ||
      newEntry.deliveryDate.trim() === ''
    ) {
      // Ensure all fields are filled out before adding
      return;
    }
    setOrderEntries([...orderEntries, newEntry]);
    // Clear the input fields
    setNewEntry({
      sku: '',
      description: '',
      qty: '',
      price: '',
      deliveryDate: '',
    });
  };

  // Function to edit an order entry
  const editOrderEntry = (index) => {
    // Implement the edit functionality here
  };

  // Function to delete an order entry
  const deleteOrderEntry = (index) => {
    const updatedOrderEntries = [...orderEntries];
    updatedOrderEntries.splice(index, 1);
    setOrderEntries(updatedOrderEntries);
  };

  // Function to export order entries to Excel
  const exportToExcel = () => {
    const data = [
      ['SKU', 'Description', 'Qty', 'Price', 'Delivery Date'], // Excel headers
      ...orderEntries.map((entry) => [
        entry.sku,
        entry.description,
        entry.qty,
        entry.price,
        entry.deliveryDate,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'OrderEntries'); // 'OrderEntries' is the sheet name

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'order_entries.xlsx'; // The file name for the Excel download
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className='orderentrytittle'>Order Entry</h2>
      <div className='datafieldentry'>
        <input
          type="text"
          placeholder="SKU"
          value={newEntry.sku}
          onChange={(e) => setNewEntry({ ...newEntry, sku: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newEntry.description}
          onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Qty"
          value={newEntry.qty}
          onChange={(e) => setNewEntry({ ...newEntry, qty: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newEntry.price}
          onChange={(e) => setNewEntry({ ...newEntry, price: e.target.value })}
        />
        <input
          type="date"
          placeholder="Delivery Date"
          value={newEntry.deliveryDate}
          onChange={(e) => setNewEntry({ ...newEntry, deliveryDate: e.target.value })}
        />
         <button className='buttonorderentry' onClick={addOrderEntry}>Add</button>
      <button className='buttonorderentry' onClick={exportToExcel}>
        <RiFileExcel2Line /> Export
      </button>

      </div>

      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Delivery Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orderEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.sku}</td>
              <td>{entry.description}</td>
              <td>{entry.qty}</td>
              <td>{entry.price}</td>
              <td>{entry.deliveryDate}</td>
              <td>
                <button onClick={() => editOrderEntry(index)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteOrderEntry(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button>Save for Later</button>
        <button>Send Order</button>
      </div>
    </div>
  );
};

export default OrderEntry;
