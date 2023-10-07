import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Entry.css';
import Emailform from './Emailform';
import SimpleBarChart from './Components/SimpleBarChart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BackupTwoTone } from '@mui/icons-material';


function DemoEntry() {
  return (
    <div className='height'>
      <div className='Entrytext3'>
        <h1>Hi 👋</h1>
        <p>
          I'm a front-end developer with a background in data analysis within the supply chain. I have a knack for spotting patterns and creating solutions to make processes smoother. Right now, I'm diving into the world of Electronic Data Interchange (EDI), and it's super exciting! 😄
          <br/><br/>
          In this EDI project, you'll find cool features like order tracking, bulk order requests, and an inventory table. We can easily import and export data, making things run like a charm. There's even more exciting stuff on the horizon, so stay tuned for updates!
          <br/><br/>
          I'd love to hear your feedback as we venture into this journey together. Thanks for joining in, and I hope you enjoy what we're building! 🚀
        </p>
      </div>

      <div className='Entrytext2'>
        <h1>EDI</h1>
        <p>
          Businesses across the supply chain commonly use electronic data exchange (EDI) to transfer business documents in a timely manner.
        </p>
        <p>
          A flexible platform that supports customizations and enables you to make adjustments on-the-fly to handle issues specific to your business processes is critical. Look for an agile platform that allows you to customize your integrations.
        </p>
      </div>

      <div className='Entrytext4'>
        <h1>Custom Indicators  </h1>
        <p>
        <SimpleBarChart />
        </p>
        <p>
        Tailored to specific tasks and workflows within the logistics process. This customization can streamline operations, reduce data entry errors, and enhance overall workflow efficiency.
        </p>
      </div>

      <div className='Entrytext'>
        <h1>Let's Start</h1>
        <p>Click the button below to go to the</p>
        <Link to="/home" style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary">
        Order tracking
      </Button>
    </Link>
      </div>

      <br/>

      <Emailform />
    </div>
  );
}

export default DemoEntry;
