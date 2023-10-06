import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import OrderEntry from './OrderEntry';
import Logistic from './Logistic'; // Import the Logistic component
import './TopMenuBar.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DemoEntry from './DemoEntry'; // Import the DemoEntry component



// Add import for Inventory component if it exists
import Inventory from './Inventory';
import { Height } from '@mui/icons-material';

function App() {
  const [items, setItems] = useState([
    { sku: 'ABC123', description: 'Item 1', qty: 10 },
    { sku: 'DEF456', description: 'Item 2', qty: 5 },
    { sku: 'GHI789', description: 'Item 3', qty: 20 },
  ]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      <div className='Sidebar'>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
            {auth && (
              <div className=''>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List className='listnavbar'>
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Link to="/" className="menu-link">
                Home
              </Link>
            </ListItem>
            
         
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Link to="/logistic" className="menu-link">
                Logistic
              </Link>
            </ListItem>

            

            {/* Add a new link for Inventory */}
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <Link to="/inventory" className="menu-link">
                Inventory
              </Link>
            </ListItem>
          </List>
        </Drawer>

        <Routes>
        <Route path="/" element={<DemoEntry />} />

        <Route path="/home" element={<Home items={items} />} />
        
        <Route path="/logistic" element={<Logistic />} />
        <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
