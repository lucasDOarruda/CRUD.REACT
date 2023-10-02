import React, { useState } from 'react';
import './Home.css';
import { orders } from './dummyData';

function Home() {
  const [searchField, setSearchField] = useState('');


  
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);

  const handleSearch = () => {
    // Convert the searchField to lowercase for case-insensitive search
    const searchTerm = searchField.toLowerCase();

    // Filter orders based on whether the Order ID or Client Name contains the search term
    const filtered = orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm) ||
        order.clientName.toLowerCase().includes(searchTerm)
    );

    // Update the filtered orders and toggle the table visibility
    setFilteredOrders(filtered);
    setTableVisible(filtered.length > 0);
  };

  const handleEdit = (order) => {
    // Implement the logic for editing an order here
    console.log(`Editing order with ID: ${order.id}`);
  };

  const handleDelete = (orderId) => {
    // Implement the logic for deleting an order here
    console.log(`Deleting order with ID: ${orderId}`);

    // Remove the deleted order from the filteredOrders state
    setFilteredOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <div className="home-container">

      <container className="SUMMARY">
        
        <h2>Searh ID 1 -20 | Client Name A - T</h2>

         </container>

      <h2 className="h2home">Order Tracking</h2>

      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Order ID or Client Name"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button className='SearchHome' onClick={handleSearch}>Search</button>
      </div>

      {/* Conditionally render the table based on visibility */}
      {tableVisible && (
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Value</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="small-text">{order.id}</td>
                  <td className="small-text">{order.clientName}</td>
                  <td className="small-text">{order.sku}</td>
                  <td className="small-text">{order.description}</td>
                  <td className="small-text">{order.qty}</td>
                  <td className="small-text">{order.value}</td>
                  <td className="small-text">
                    {/* Status with three lines */}
                    <ul>
                      <li>Order Placed</li>
                      
                    </ul>
                  </td>
                  <td>
                    {/* Edit and Delete buttons with event handlers */}
                    <button onClick={() => handleEdit(order)}>Edit</button>
                    <button onClick={() => handleDelete(order.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;