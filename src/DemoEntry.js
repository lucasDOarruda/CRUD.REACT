// Inside the DemoEntry.js component

import React from 'react';
import { Link } from 'react-router-dom';

function DemoEntry() {
  return (
    <div>
      <h1>Welcome to the Demo Entry Page</h1>
      <p>Click the button below to go to the main page:</p>
      <Link to="/home">Go to Main Page</Link>
    </div>
  );
}

export default DemoEntry;
