const express = require("express");
const router = express.Router();

const { connectToDatabase } = require("../models/db");

router.get("/gifts", async (req, res) => {
    try {
        console.log('1')
        const db = await connectToDatabase();
        console.log('2',db)
        const collection = db.collection("items");
        console.log('3',collection)
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
        const { id } = req.params;
        console.log("Requested ID:", id);
        const item = await collection.findOne({
            _id: id
        });
        console.log("Found item:", item);
        if (!item) {
            return res.status(404).json({
                error: "Item not found"
            });
        }
        res.status(200).json(item);
    } catch (e) {
        console.error("Error fetching gift:", e);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;