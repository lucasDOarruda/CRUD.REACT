const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema and model for your inventory collection
const inventorySchema = new mongoose.Schema({
  productName: String,
  category: String,
  quantity: Number,
  price: Number,
  unitCarton: String,
  ctnWeight: Number,
  ctnHeight: Number,
  ctnWidth: Number,
});

const Inventory = mongoose.model('Inventory', inventorySchema);

app.use(bodyParser.json());

// ...
// Set up your API routes and controllers here
// ...

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Create a new item
app.post('/api/inventory/add', (req, res) => {
    const newItem = new Inventory(req.body);
    newItem.save((err) => {
      if (err) {
        res.status(500).send('Error adding item to the database.');
      } else {
        res.status(200).send('Item added successfully.');
      }
    });
  });
  
  // Fetch all items
  app.get('/api/inventory', (req, res) => {
    Inventory.find({}, (err, items) => {
      if (err) {
        res.status(500).send('Error fetching inventory data.');
      } else {
        res.json(items);
      }
    });
  });
  
  // Implement update and delete routes similarly
  