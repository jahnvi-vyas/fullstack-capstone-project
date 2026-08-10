const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const logger = pino();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to giftsdb
        const db = await connectToDatabase();

        // Task 2: Access users collection
        const collection = db.collection('users');

        // Task 3: Check if email already exists
        const existingEmail = await collection.findOne({
            email: req.body.email
        });

        if (existingEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        const email = req.body.email;

        // Task 4: Save user details
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date()
        });

        // Task 5: Create JWT authentication
        const payload = {
            user: {
                id: newUser.insertedId
            }
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');

        res.json({
            authtoken,
            email
        });

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Access users collection
        const collection = db.collection("users");

        // Task 3: Find user by email
        const theUser = await collection.findOne({
            email: req.body.email
        });

        // Task 7: User not found
        if (!theUser) {
            logger.error('User not found');
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // Task 4: Check password
        const result = await bcryptjs.compare(
            req.body.password,
            theUser.password
        );

        if (!result) {
            logger.error('Passwords do not match');
            return res.status(404).json({
                error: 'Wrong password'
            });
        }

        // Task 5: Get user details
        const userName = theUser.firstName;
        const userEmail = theUser.email;

        // Task 6: Create JWT payload
        const payload = {
            user: {
                id: theUser._id.toString()
            }
        };

        // Create authentication token
        const authtoken = jwt.sign(
            payload,
            JWT_SECRET
        );

        logger.info('User logged in successfully');

        // Send response
        res.json({
            authtoken,
            userName,
            userEmail
        });

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

router.put('/update', async (req, res) => {

    // Task 2: Validate input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.error(
            'Validation errors in update request',
            errors.array()
        );

        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {

        // Task 3: Check email in request headers
        const email = req.headers.email;

        if (!email) {
            logger.error(
                'Email not found in the request headers'
            );

            return res.status(400).json({
                error: "Email not found in the request headers"
            });
        }

        // Task 4: Connect to MongoDB
        const db = await connectToDatabase();

        // Access users collection
        const collection = db.collection("users");

        // Task 5: Find existing user
        const existingUser = await collection.findOne({
            email
        });

        if (!existingUser) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // Update fields from request body
        if (req.body.firstName !== undefined) {
            existingUser.firstName = req.body.firstName;
        }

        if (req.body.lastName !== undefined) {
            existingUser.lastName = req.body.lastName;
        }

        if (req.body.password !== undefined) {
            const salt = await bcryptjs.genSalt(10);

            existingUser.password = await bcryptjs.hash(
                req.body.password,
                salt
            );
        }

        existingUser.updatedAt = new Date();

        // Task 6: Update user credentials
        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: existingUser },
            { returnDocument: 'after' }
        );

        // Task 7: Create JWT authentication
        const payload = {
            user: {
                id: existingUser._id.toString()
            }
        };

        const authtoken = jwt.sign(
            payload,
            JWT_SECRET
        );

        logger.info('User profile updated successfully');

        res.json({
            authtoken
        });

    } catch (e) {

        logger.error(e);

        return res.status(500).send(
            'Internal server error'
        );
    }
});

module.exports = router;