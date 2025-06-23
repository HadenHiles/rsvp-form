require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

app.post('/rsvp', (req, res) => {
    const { name, email, message } = req.body;

    const data = {
        from: 'RSVP Form <rsvp@' + process.env.MAILGUN_DOMAIN + '>',
        to: ['4nataliehiles@gmail.com', 'hadenhiles@gmail.com'],
        subject: 'New RSVP Submission',
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br>${message}</p>`
    };

    mg.messages().send(data, function (error, body) {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email.' });
        }
        res.json({ message: 'RSVP sent successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
