// Home.js
import React from 'react';

function Home({ items }) {
  return (
    <div>
      <h2>Home Page</h2>
      <h3>Available Items</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            SKU: {item.sku}, Description: {item.description}, Quantity: {item.qty}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
