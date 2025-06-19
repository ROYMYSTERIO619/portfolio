const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deeptaroy619@gmail.com', // Your Gmail address
        pass: 'your_app_password' // Your Gmail app password
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Email options
        const mailOptions = {
            from: 'deeptaroy619@gmail.com',
            to: 'deeptaroy619@gmail.com', // Your email where you want to receive messages
            subject: `New Contact Form Message from ${name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;

        // Email options for newsletter subscription
        const mailOptions = {
            from: 'deeptaroy619@gmail.com',
            to: 'deeptaroy619@gmail.com',
            subject: 'New Newsletter Subscription',
            html: `
                <h3>New Newsletter Subscription</h3>
                <p><strong>Email:</strong> ${email}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Successfully subscribed to newsletter!' });
    } catch (error) {
        console.error('Error processing newsletter subscription:', error);
        res.status(500).json({ message: 'Failed to subscribe. Please try again later.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 