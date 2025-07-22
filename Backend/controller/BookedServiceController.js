const express = require('express');

const router = express.Router();

const nodemailer = require("nodemailer");

const BookedService = require('../model/BookedService')

router.get('/', function (req, res) {
    res.send("This is Booked Service Home Page....!!!")
});

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
router.post('/applyNewService', async (req, res) => {
    const data = new BookedService ({
        providerid: req.body.providerid,
        userid: req.body.userid,
        serviceid: req.body.serviceid,
        apply_date: req.body.apply_date

    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAllBookedService',async ( req, res) => {
    try{
        const data = await BookedService.find()
        .populate('providerid')
        .populate('serviceid')
        .populate('userid');
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Booked Service by Userid
router.get('/getAllBookedServicesByUser/:id', async (req, res) => {
    try {
        const data = await BookedService.find({'userid': req.params.id})
            .populate('providerid')
            .populate('serviceid')
            .populate('userid');
        
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Get all applied job by Provider
router.get('/getAllBookedServicesByProvider/:id', async (req, res) => {
    try {
        const data = await BookedService.find({'providerid': req.params.id})
            .populate({
                path: 'userid',
                model: 'User', // Make sure this matches your User model name
                select: 'name address city district contact'
            })
            .populate({
                path: 'serviceid',
                model: 'Service', // Make sure this matches your Service model name
                select: 'service_name description'
            })
            .populate({
                path: 'providerid',
                model: 'Provider', // Make sure this matches your Provider model name
                select: 'name'
            });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get all applied candidates by company ID and job ID
router.get('/getBookedByServiceAndProvider/:providerid/:serviceid', async (req, res) => {
    const { providerid, serviceid } = req.params;
    try {
        const data = await BookedService.find({ providerid, serviceid })
        .populate('providerid')
        .populate('serviceid')
        .populate('userid');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete by ID Method
router.delete('/deleteService/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await BookedService.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Updated Confirmation Email API
router.patch('/updateStatusForConfirm/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await BookedService.findByIdAndUpdate(id, updatedData, options)
            .populate('userid')
            .populate('serviceid')
            .populate('providerid');

        if (!result) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if user data exists and has email
        if (!result.userid || !result.userid.email) {
            return res.status(400).json({ 
                message: 'User email not found',
                data: result
            });
        }

        const mailData = {
            from: process.env.EMAIL,
            to: result.userid.email,  // Get email from populated user
            subject: 'Your Booking Has Been Confirmed - Essential Needs And Services',
            text: `Hello ${result.userid.name},

Your booking with reference #${id} has been confirmed!

Booking Details:
Provider: ${result.providerid.name}
Service: ${result.serviceid.service_name}
Date: ${result.apply_date}

The provider will contact you within 2 working days to finalize the details.

If you have any questions, please contact our support team at 6289737812.

Thank you for choosing Essential Needs And Services!

Best regards,
The Essential Needs And Services Team`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
                <h2 style="color: #2a5885; text-align: center;">Booking Confirmed!</h2>
                <p>Hello <strong>${result.userid.name}</strong>,</p>
                <p>Your booking with reference <strong>#${id}</strong> has been confirmed!</p>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #2a5885; margin-top: 0;">Booking Details:</h3>
                    <p><strong>Provider:</strong> ${result.providerid.name}</p>
                    <p><strong>Service:</strong> ${result.serviceid.service_name}</p>
                    <p><strong>Date:</strong> ${result.apply_date}</p>
                </div>

                 <p style="margin: 15px 0; padding: 10px; background-color: #f0f8ff; border-left: 4px solid #2a5885;">
            <strong>Note:</strong> The provider will contact you within 2 working days to finalize the details.
        </p>
                
                <p>If you have any questions, please contact our support team at <strong>6289737812</strong>.</p>
                <p>Thank you for choosing <strong>Essential Needs And Services</strong>!</p>
                
                <p style="border-top: 1px solid #e1e1e1; padding-top: 20px; margin-top: 20px;">
                    Best regards,<br>
                    <strong>The Essential Needs And Services Team</strong>
                </p>
            </div>
            `
        };

        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error('Confirmation email failed:', err);
                return res.status(200).json({
                    message: 'Booking confirmed but email failed to send',
                    data: result
                });
            }
            res.status(200).json({
                message: 'Booking confirmed and email sent successfully',
                data: result
            });
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update the cancellation endpoint
router.patch('/updateStatusForCancel/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await BookedService.findByIdAndUpdate(id, updatedData, options)
            .populate('userid')
            .populate('serviceid')
            .populate('providerid');

        if (!result) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (!result.userid || !result.userid.email) {
            return res.status(400).json({ 
                message: 'User email not found',
                data: result
            });
        }

        const mailData = {
            from: process.env.EMAIL,
            to: result.userid.email,
            subject: 'Your Booking Has Been Cancelled - Essential Needs And Services',
            text: `Hello ${result.userid.name},

We're sorry to inform you that your booking with reference #${id} has been cancelled.

Booking Details:
Provider: ${result.providerid.name}
Service: ${result.serviceid.service_name}
Date: ${result.apply_date}

If this was a mistake or you'd like to reschedule, please contact our support team at 6289737812.

We hope to serve you in the future.

Best regards,
The Essential Needs And Services Team`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
                <h2 style="color: #dc3545; text-align: center;">Booking Canceled</h2>
                <p>Hello <strong>${result.userid.name}</strong>,</p>
                <p>We're sorry to inform you that your booking with reference <strong>#${id}</strong> has been canceled.</p>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #2a5885; margin-top: 0;">Booking Details:</h3>
                    <p><strong>Provider:</strong> ${result.providerid.name}</p>
                    <p><strong>Service:</strong> ${result.serviceid.service_name}</p>
                    <p><strong>Date:</strong> ${result.apply_date}</p>
                </div>
                
                <p>If this was a mistake or you'd like to reschedule, please contact our support team at <strong>6289737812</strong>.</p>
                <p>We hope to serve you in the future.</p>
                
                <p style="border-top: 1px solid #e1e1e1; padding-top: 20px; margin-top: 20px;">
                    Best regards,<br>
                    <strong>The Essential Needs And Services Team</strong>
                </p>
            </div>
            `
        };

        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error('Cancellation email failed:', err);
                return res.status(200).json({
                    message: 'Booking canceled but email failed to send',
                    data: result
                });
            }
            res.status(200).json({
                message: 'Booking canceled and email sent successfully',
                data: result
            });
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Service Done endpoint
router.patch('/updateStatusForServiceDone/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await BookedService.findByIdAndUpdate(id, updatedData, options)
            .populate('userid')
            .populate('serviceid')
            .populate('providerid');

        if (!result) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (!result.userid || !result.userid.email) {
            return res.status(400).json({ 
                message: 'User email not found',
                data: result
            });
        }

        const mailData = {
            from: process.env.EMAIL,
            to: result.userid.email,
            subject: 'Your Service Has Been Completed - Essential Needs And Services',
            text: `Hello ${result.userid.name},

We're pleased to inform you that your service with reference #${id} has been marked as completed by the provider.

Service Details:
Provider: ${result.providerid.name}
Service: ${result.serviceid.service_name}
Date: ${result.apply_date}

Thank you for choosing our services. We hope to serve you again in the future.

Best regards,
The Essential Needs And Services Team`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
                <h2 style="color: #28a745; text-align: center;">Service Completed</h2>
                <p>Hello <strong>${result.userid.name}</strong>,</p>
                <p>We're pleased to inform you that your service with reference <strong>#${id}</strong> has been marked as completed by the provider.</p>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #2a5885; margin-top: 0;">Service Details:</h3>
                    <p><strong>Provider:</strong> ${result.providerid.name}</p>
                    <p><strong>Service:</strong> ${result.serviceid.service_name}</p>
                    <p><strong>Date:</strong> ${result.apply_date}</p>
                </div>
                
                <p>Thank you for choosing our services. We hope to serve you again in the future.</p>
                
                <p style="border-top: 1px solid #e1e1e1; padding-top: 20px; margin-top: 20px;">
                    Best regards,<br>
                    <strong>The Essential Needs And Services Team</strong>
                </p>
            </div>
            `
        };

        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error('Service completion email failed:', err);
                return res.status(200).json({
                    message: 'Service marked as done but email failed to send',
                    data: result
                });
            }
            res.status(200).json({
                message: 'Service marked as done and email sent successfully',
                data: result
            });
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router