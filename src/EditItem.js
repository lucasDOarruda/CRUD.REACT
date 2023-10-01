// EditItem.js
import React from 'react';

function EditItem({ items, onEdit, onDelete }) {
  return (
    <div>
      <h2>Edit Item Page</h2>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Description</th>
            <th>Quantity (QTY)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.sku}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>
                <button onClick={() => onEdit(index)}>Edit</button>
                <button onClick={() => onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditItem;
