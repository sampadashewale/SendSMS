const fast2sms = require('fast-two-sms');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (like index.html)
app.use(express.static(__dirname));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to send SMS
app.post('/sendmessage', (req, res) => {
    const message = req.body.message;
    const number = req.body.number;

    if (!message || !number) {
        return res.status(400).send('Message and number are required.');
    }

    sendMessage(message, number, res);
});

// Async function to send an SMS
async function sendMessage(message, number, res) {
    const options = {
        authorization:"879NU3nVgQ5XHBlSzqCiRDW1AKOGFxste2h4mJYZwaor6EuP0L0m4vOjtnIre1RiDVxguKbFsX6AZ2SW", // Replace with your Fast2SMS API key
        message: message,
        numbers: [number],
    };

    try {
        const response = await fast2sms.sendMessage(options);
        console.log(response);
        res.send("SMS OTP sent successfully");
    } catch (error) {
        console.error("Error sending SMS:", error);
        res.status(500).send("Some error occurred while sending the SMS.");
    }
}

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});






