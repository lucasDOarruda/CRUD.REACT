// Home.js
import React from 'react';
import './Home.css'; // Import the CSS file for Home





function Home({ items }) {
  const calculateStockLevel = () => {
    // Calculate stock level based on the value of SKU (you can implement your logic here)
    // For example, you can sum the SKU values for all items
    const totalSkuValue = items.reduce((acc, item) => acc + parseFloat(item.skuValue || 0), 0);

    // You can define your own logic to determine the stock level based on totalSkuValue
    if (totalSkuValue < 1000) {
      return 'Low';
    } else if (totalSkuValue >= 1000 && totalSkuValue <= 5000) {
      return 'Medium';
    } else {
      return 'High';
    }
  };

  return (
    <div className="home-container">
      <h2 className='h2home'>Home Page</h2>
      <div className="stock-widget">
        <p>Stock Level: {calculateStockLevel()}</p>
      </div>
      <table className="item-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Description</th>
            <th>Quantity (QTY)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.sku}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
