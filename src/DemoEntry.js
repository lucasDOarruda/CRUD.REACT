

import React from 'react';
import { Link } from 'react-router-dom';
import './Entry.css';
import Emailform from './Emailform';

function DemoEntry() {
  return (


<div className='height'>


<div className='Entrytext2'>
      <h1 >EDI </h1>
      <p>Businesses across the supply chain commonly use electronic data exchange (EDI) to transfer business documents in a timely manner.</p>
      <p>flexible platform that supports customizations and enables you make adjustments on-the-fly to handle issues specific to your business processes is critical. Look for an agile platform that allows you to customize your integrations.</p>
      
    </div>


    <div className='Entrytext'>
      <h1>Let's Start</h1>
      <p>Click the button below to go to the</p>
      <Link to="/home">Order tracking</Link>
    </div>

    <br/>

    <Emailform />

 

</div>


  );
}

export default DemoEntry;
