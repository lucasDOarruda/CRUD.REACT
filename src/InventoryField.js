import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      
    >
      <div>
        <TextField
          required
          id="sku"
          label="SKU"
        
        />

        <TextField
          required
          id="description"
          label="Description"
         
        />

        <TextField
          required
          id="value"
          label="Value (in $)"
       
        />

        <TextField
          required
          id="unit"
          label="Unit"
     
        />

        <TextField
          required
          id="ctn"
          label="CTN"
         
        />

        <TextField
          required
          id="cartoonWeight"
          label="Cartoon Weight"
 
        />

        <TextField
          required
          id="cartoonHeight"
          label="Cartoon Height"
 
        />

        <TextField
          required
          id="cartoonWidth"
          label="Cartoon Width"
          defaultValue=""
        />
      </div>
    </Box>
  );
}
