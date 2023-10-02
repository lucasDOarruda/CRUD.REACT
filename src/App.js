import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import AddItem from './AddItem';
import EditItem from './EditItem';
import Home from './Home';
import OrderEntry from './OrderEntry';
import './TopMenuBar.css';
import Logistic from './Logistic'; // Import the Logistic component


function App() {
  const [items, setItems] = useState([
    { sku: 'ABC123', description: 'Item 1', qty: 10 },
    { sku: 'DEF456', description: 'Item 2', qty: 5 },
    { sku: 'GHI789', description: 'Item 3', qty: 20 },
  ]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <Router>
      <div className="sizemaindiv">
        <nav>
          <ul className="topmanubar">
            <li>
              <Link to="/">
                <i className="fa fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/add-item">
                <i className="fa fa-plus"></i> Add Item
              </Link>
            </li>
            <li>
              <Link to="/edit-item">
                <i className="fa fa-pencil"></i> Edit Item
              </Link>
            </li>
            <li>
              <Link to="/order-entry">
                <i className="fa fa-list"></i> Order Entry
              </Link>
            </li>
            <li>
              <Link to="/logistic">
          <i className="fa fa-truck"></i> Logistic
              </Link>
</li>



          </ul>
        </nav>

        <Routes>
          <Route path="" element={<Home items={items} />} />
          <Route path="/add-item" element={<AddItem onAddItem={handleAddItem} />} />
          <Route path="/edit-item" element={<EditItem items={items} />} />
          <Route path="/order-entry" element={<OrderEntry />} />
          <Route path="/logistic" element={<Logistic />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
