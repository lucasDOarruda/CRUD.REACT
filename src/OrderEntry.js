// OrderEntry.js
import React, { useState } from 'react';
import './index.css'; // Import the CSS file

const OrderEntry = () => {
  // Initialize state to manage order entries
  const [orderEntries, setOrderEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    sku: '',
    qty: '',
    shippingAddress: '',
    requestedDeliveryDate: '',
  });

  // Function to add a new order entry
  const addOrderEntry = () => {
    if (
      newEntry.sku.trim() === '' ||
      newEntry.qty.trim() === '' ||
      newEntry.shippingAddress.trim() === '' ||
      newEntry.requestedDeliveryDate.trim() === ''
    ) {
      // Ensure all fields are filled out before adding
      return;
    }
    setOrderEntries([...orderEntries, newEntry]);
    // Clear the input fields
    setNewEntry({
      sku: '',
      qty: '',
      shippingAddress: '',
      requestedDeliveryDate: '',
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

  return (
    <div>
      <h2>Order Entry</h2>
      <div>
        <input
          type="text"
          placeholder="SKU"
          value={newEntry.sku}
          onChange={(e) => setNewEntry({ ...newEntry, sku: e.target.value })}
        />
        <input
          type="text"
          placeholder="Qty"
          value={newEntry.qty}
          onChange={(e) => setNewEntry({ ...newEntry, qty: e.target.value })}
        />
        <input
          type="text"
          placeholder="Shipping Address"
          value={newEntry.shippingAddress}
          onChange={(e) =>
            setNewEntry({ ...newEntry, shippingAddress: e.target.value })
          }
        />
        <input className='Datebox'
          type="date" // Change the input type to date
          placeholder="Requested Delivery Date"
          value={newEntry.requestedDeliveryDate}
          onChange={(e) =>
            setNewEntry({ ...newEntry, requestedDeliveryDate: e.target.value })
          }
        />
        <button onClick={addOrderEntry}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Qty</th>
            <th>Shipping Address</th>
            <th>Requested Delivery Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orderEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.sku}</td>
              <td>{entry.qty}</td>
              <td>{entry.shippingAddress}</td>
              <td>{entry.requestedDeliveryDate}</td>
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
