const express = require("express");
const router = express.Router();

const connectToDatabase = require("../models/db");

// GET /api/gifts
router.get("/", async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Access gifts collection
        const collection = db.collection("gifts");

        // Task 3: Fetch all gifts
        const gifts = await collection.find({}).toArray();

        // Task 4: Return gifts
        res.json(gifts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve gifts"
        });
    }
});

// GET /api/gifts/:id
router.get("/:id", async (req, res) => {
    try {
        // Get ID from URL
        const id = req.params.id;

        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Access gifts collection
        const collection = db.collection("gifts");

        // Task 3: Find specific gift by ID
        const gift = await collection.findOne({ id: id });

        // Return gift
        res.json(gift);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve gift"
        });
    }
});

module.exports = router;