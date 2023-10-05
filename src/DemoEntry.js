

import React from 'react';
import { Link } from 'react-router-dom';
import './Entry.css';

function DemoEntry() {
  return (


<div>


<div className='Entrytext2'>
      <h1>EDI </h1>
      <p>Businesses across the supply chain commonly use electronic data exchange (EDI) to transfer business documents in a timely manner.</p>
      <p>flexible platform that supports customizations and enables you make adjustments on-the-fly to handle issues specific to your business processes is critical. Look for an agile platform that allows you to customize your integrations.</p>
      
    </div>


    <div className='Entrytext'>
      <h1>Welcome to the Demo Entry Page</h1>
      <p>Click the button below to go to the main page:</p>
      <Link to="/home">Go to Main Page</Link>
    </div>


</div>


  );
}

export default DemoEntry;
