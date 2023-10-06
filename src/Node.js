const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service you prefer
  auth: {
    user: '', // Replace with your email
    pass: '', // Replace with your email password or app-specific password
  },
});

// Route to send an email
app.post('/send-email', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: '', // Replace with your email
    to: '', // Replace with the recipient's email
    subject: 'Contact Request',
    text: `You have a new contact request from ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
