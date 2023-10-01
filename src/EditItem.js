import React, { useState } from 'react';

function EditItem({ items, onEdit, onDelete }) {
  const [editIndex, setEditIndex] = useState(null);

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleSaveEdit = (index, editedItem) => {
    setEditIndex(null);
    onEdit(index, editedItem);
  };

  const handleDeleteClick = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(index);
    }
  };

  return (
    <div>
      <h2>Inventory</h2>
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
              <td>{index === editIndex ? <input type="text" value={item.sku} /> : item.sku}</td>
              <td>{index === editIndex ? <input type="text" value={item.description} /> : item.description}</td>
              <td>{index === editIndex ? <input type="text" value={item.qty} /> : item.qty}</td>
              <td>
                {index === editIndex ? (
                  <>
                    <button onClick={() => handleSaveEdit(index, { sku: item.sku, description: item.description, qty: item.qty })}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDeleteClick(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditItem;
