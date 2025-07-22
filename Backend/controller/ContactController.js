const express = require('express');

const router = express.Router();

const nodemailer= require("nodemailer");

const Contact = require('../model/Contact');

router.get('/', function (req, res) {
    res.send("This is Contact Page....!!!")
});

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD,
         },
    secure: true,
});


//Post Method
router.post('/sendContact', async (req, res) => {
    
    const data = new Contact ({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })
    try {
        const dataToSave = await data.save();
         //send mail to the registered user
        const mailData = {
            from: process.env.EMAIL,  // sender address
            to: req.body.email ,   // list of receivers
            subject: 'Thank You for Contacting Essential Needs And Services',
                text: `Hello ${req.body.name},

            Thank you for reaching out to Essential Needs And Services!

            We have received your message and our team is reviewing your inquiry. We strive to respond to all contacts within 24 hours during business days.

            Your reference number is: #${Math.floor(100000 + Math.random() * 900000)}

            If your matter is urgent, please call our support line at 6289737812.

            We appreciate your interest in our services and look forward to assisting you.

            Best regards,
            The Essential Needs And Services Team`,
                html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
                    <h2 style="color: #2a5885;">Hello ${req.body.name},</h2>
                    <p>Thank you for reaching out to <strong>Essential Needs And Services</strong>!</p>
                    <p>We have received your message and our team is reviewing your inquiry. We strive to respond to all contacts within 24 hours during business days.</p>
                    <p style="background-color: #f2f2f2; padding: 10px; border-left: 4px solid #2a5885;">Your reference number is: <strong>#${Math.floor(100000 + Math.random() * 900000)}</strong></p>
                    <p>If your matter is urgent, please call our support line at <strong>6289737812</strong>.</p>
                    <p>We appreciate your interest in our services and look forward to assisting you.</p>
                    <br>
                    <p>Best regards,<br><strong>The Essential Needs And Services Team</strong></p>
                </div>
                `,
            };
      
          transporter.sendMail(mailData, function (err, info) {
              if(err)
                res.send({message: 'failed'})
              else
                res.send({message: 'success'});
           });

        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
module.exports = router