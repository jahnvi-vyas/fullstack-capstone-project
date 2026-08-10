const express = require("express");
const router = express.Router();

const { connectToDatabase } = require("../db");

router.get("/gifts", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("items");

        const gifts = await collection.find({}).toArray();

        res.status(200).json(gifts);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.get("/gifts/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("items");

        // Your existing ObjectId lookup code goes here

    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;