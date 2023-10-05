import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import AddItem from './AddItem';
import EditItem from './EditItem';
import Home from './Home';
import OrderEntry from './OrderEntry';
import './TopMenuBar.css';
import Logistic from './Logistic'; // Import the Logistic component
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function App() {
  const [items, setItems] = useState([
    { sku: 'ABC123', description: 'Item 1', qty: 10 },
    { sku: 'DEF456', description: 'Item 2', qty: 5 },
    { sku: 'GHI789', description: 'Item 3', qty: 20 },
  ]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Link to="/" className="menu-link">
                Home
              </Link>
            </ListItem>
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Link to="/add-item" className="menu-link">
                Add Item
              </Link>
            </ListItem>
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Link to="/edit-item" className="menu-link">
                Edit Item
              </Link>
            </ListItem>
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Link to="/order-entry" className="menu-link">
                Order Entry
              </Link>
            </ListItem>
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Link to="/logistic" className="menu-link">
                Logistic
              </Link>
            </ListItem>
          </List>
        </Drawer>

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
