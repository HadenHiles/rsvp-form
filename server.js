require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Set up nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILGUN_DOMAIN, // Use this env var for your Gmail address
        pass: process.env.MAILGUN_API_KEY // Use this env var for your Gmail app password
    }
});

app.post('/rsvp', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: `RSVP Form <${process.env.MAILGUN_DOMAIN}>`,
        to: ['4nataliehiles@gmail.com', 'hadenhiles@gmail.com'],
        subject: 'New RSVP Submission',
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br>${message}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email.' });
        }
        res.json({ message: 'RSVP sent successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
