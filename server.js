const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Twilio credentials
const accountSid = 'ACeca4c5418c0eb4565ce1dfa49101a7db';
const authToken = 'b6f24e8d0b507e91c11e5a4c8cacac6a';
const twilioPhone = '+18566197094';
const ownerPhone = '+91 7976633454';

const client = new twilio(accountSid, authToken);

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the index.html file at the root URL
const publicPath = path.join(__dirname, '/');

// Serve the 'index.html' file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Serve static files (CSS, JavaScript) from the 'taxi' directory
app.use(express.static(publicPath));

// Twilio message sending endpoint
app.post('/send-message', (req, res) => {
    const { name, email, phone, pickup, destination } = req.body;

    const message = `New booking from Vansh Tour and Travels:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Pickup: ${pickup}
    Destination: ${destination}
    Office Address: Baloda, Rajasthan`;

    client.messages.create({
        body: message,
        from: twilioPhone,
        to: ownerPhone
    })
    .then(message => {
        console.log('Message sent:', message.sid);
        res.status(200).send('Message sent successfully.');
    })
    .catch(error => {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending message.');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
