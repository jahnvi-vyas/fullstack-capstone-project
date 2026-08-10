const express = require("express");
const router = express.Router();

const connectToDatabase = require("../models/db");

router.get("/", async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Get gifts collection
        const collection = db.collection("gifts");

        // Query object for filters
        const query = {};

        // Task 2: Add name filter
        if (req.query.name && req.query.name.trim() !== "") {
            query.name = req.query.name;
        }

        // Task 3: Add other filters
        if (req.query.category) {
            query.category = req.query.category;
        }

        if (req.query.condition) {
            query.condition = req.query.condition;
        }

        if (req.query.age_years) {
            query.age_years = {
                $lte: parseInt(req.query.age_years)
            };
        }

        // Task 4: Fetch filtered gifts
        const gifts = await collection.find(query).toArray();

        res.json(gifts);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to search gifts"
        });
    }
});

module.exports = router;