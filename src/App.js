// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import AddItem from './AddItem';
import EditItem from './EditItem';
import Home from './Home';
import OrderEntry from './OrderEntry'; // Import the OrderEntry component
import './TopMenuBar.css'; // Import the CSS file for Home


function App() {
  // Initialize the items state with some dummy data
  const [items, setItems] = useState([
    { sku: 'ABC123', description: 'Item 1', qty: 10 },
    { sku: 'DEF456', description: 'Item 2', qty: 5 },
    { sku: 'GHI789', description: 'Item 3', qty: 20 },
  ]);

  // Function to add an item to the list
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <Router>
      <div className='sizemaindiv'>
        <nav>
          <ul className='topmanubar'>
          <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/add-item">Add Item</Link>
  </li>
  <li>
    <Link to="/edit-item">Edit Item</Link>
  </li>
  <li>
    <Link to="/order-entry">Order Entry</Link>
  </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home items={items} />} />
          <Route path="/add-item" element={<AddItem onAddItem={handleAddItem} />} />
          <Route path="/edit-item" element={<EditItem items={items} />} />
          <Route path="/order-entry" element={<OrderEntry />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
