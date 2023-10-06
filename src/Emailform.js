import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Emailform() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(''); // State variable for email address

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleSend = () => {
    // Assuming you have set up your server on a specific endpoint.
    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Send the email address to the server
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response from the server
        handleClose(); // Close the dialog after sending the email
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Let's get in contact
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Let's Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address here. I will get in touch shortly.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email} // Bind the value of the input to the 'email' state
            onChange={(e) => setEmail(e.target.value)} // Update the 'email' state when the input changes
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
