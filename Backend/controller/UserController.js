const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD,
  }
});

// Store OTPs temporarily
const otpStore = new Map();

// Generate random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Post Method with OTP verification
router.post('/registerUser', async (req, res) => {
    try {        
        // Log the incoming request for debugging
        console.log('Registration request received:', {
            email: req.body.email,
            name: req.body.name,
            hasPassword: !!req.body.password,
            passwordLength: req.body.password ? req.body.password.length : 0
        });

        // Validate required fields
        if (!req.body.email || !req.body.name || !req.body.password) {
            return res.status(400).json({ 
                message: 'Email, name, and password are required' 
            });
        }

        // Validate password length
        if (req.body.password.length < 8) {
            return res.status(400).json({ 
                message: 'Password must be at least 8 characters long' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User with this email already exists' 
            });
        }

        // Hash the password with salt rounds of 12 for better security
        console.log('Hashing password...');
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log('Password hashed successfully');
        
        // Create new user with hashed password but mark as unverified
        const data = new User({
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword, 
            contact: req.body.contact || '',
            address: req.body.address || '',
            city: req.body.city || '',
            district: req.body.district || '',
            isVerified: false // Add verification status
        });

        // Generate OTP
        const otp = generateOTP();
        otpStore.set(req.body.email, {
            otp: otp,
            userData: data,
            expiresAt: Date.now() + 300000 // OTP expires in 5 minutes
        });

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Your OTP for Account Verification',
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP sent to email:', req.body.email);
        
        res.status(200).json({
            message: 'OTP sent to email for verification',
            email: req.body.email,
            requiresOTP: true
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        
        // Handle duplicate key error (if email is unique in schema)
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: 'User with this email already exists' 
            });
        }
        
        res.status(500).json({ 
            message: 'Internal server error during registration',
            error: error.message 
        });
    }
});

// OTP Verification Endpoint
router.post('/verifyOTP', async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ 
                message: 'Email and OTP are required' 
            });
        }

        const otpData = otpStore.get(email);

        if (!otpData) {
            return res.status(400).json({ 
                message: 'OTP expired or invalid email' 
            });
        }

        if (otpData.expiresAt < Date.now()) {
            otpStore.delete(email);
            return res.status(400).json({ 
                message: 'OTP has expired' 
            });
        }

        if (otpData.otp !== otp) {
            return res.status(400).json({ 
                message: 'Invalid OTP' 
            });
        }

        // OTP is valid, save the user
        const userToSave = otpData.userData;
        userToSave.isVerified = true;
        const dataToSave = await userToSave.save();
        
        // Clean up
        otpStore.delete(email);

        // Return success response without password
        const { password, ...userWithoutPassword } = dataToSave.toObject();
        res.status(201).json({
            message: 'User registered and verified successfully',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ 
            message: 'Internal server error during OTP verification',
            error: error.message 
        });
    }
});

// Resend OTP Endpoint
router.post('/resendOTP', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                message: 'Email is required' 
            });
        }

        // Check if there's existing user data
        const otpData = otpStore.get(email);
        if (!otpData) {
            return res.status(400).json({ 
                message: 'No pending registration for this email' 
            });
        }

        // Generate new OTP
        const newOTP = generateOTP();
        otpStore.set(email, {
            otp: newOTP,
            userData: otpData.userData,
            expiresAt: Date.now() + 300000 
        });

        // Send new OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your New OTP for Account Verification',
            text: `Your new OTP is ${newOTP}. It will expire in 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        console.log('New OTP sent to email:', email);
        
        res.status(200).json({
            message: 'New OTP sent to email',
            email: email
        });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ 
            message: 'Internal server error while resending OTP',
            error: error.message 
        });
    }
});


// Login Method with password verification
router.post('/loginUser', async (req, res) => {
    try {
        console.log('Login request received for email:', req.body.email);

        // Validate input
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            console.log('User not found with email:', req.body.email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('User found, comparing passwords...');
        
        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (isMatch) {
            console.log('Password match successful');
            // Return user data in array format (to match your frontend expectation)
            const { password, ...userWithoutPassword } = user.toObject();
            res.status(200).json([userWithoutPassword]);
        } else {
            console.log('Password mismatch');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error during login' });
    }
});

//Get all Method (exclude passwords for security)
router.get('/getAllUser', async (req, res) => {
    try{
        const data = await User.find().select('-password');
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method (exclude password for security)
router.get('/getUserByID/:id', async (req, res) => {
    try{
        const data = await User.findById(req.params.id).select('-password');
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method (with password hashing if password is being updated)
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = { ...req.body };
        
        // If password is being updated, hash it
        if (updatedData.password) {
            if (updatedData.password.length < 8) {
                return res.status(400).json({ 
                    message: 'Password must be at least 8 characters long' 
                });
            }
            updatedData.password = await bcrypt.hash(updatedData.password, 12);
        }
        
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        ).select('-password');

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `User ${data.name} has been deleted` })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router