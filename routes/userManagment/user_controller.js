const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var user = require("../userManagment/user_model.js").User;

// User Registration
router.post('/register', async (req, res) => {
    try {
        
        const { firstName, lastName, email, password, contactNo } = req.body;
        if (!firstName || !lastName || !email || !password || !contactNo) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists. Please choose another email.' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new user({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNo,
        });

      
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const users = await user.findOne({ email }).select('+password');
        if (!users) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch =  bcrypt.compare(password, users.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

     
        const token = jwt.sign({ usersId: users._id }, 'djdnskDSJnfjdkdsjadjnHKJDSkhLSHkdSIdsHDdasqrewOS', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
