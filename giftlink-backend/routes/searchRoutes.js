const express = require("express");
const router = express.Router();

const { connectToDatabase } = require("../db");

router.get("/search", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("items");

        const { category } = req.query;

        let query = {};

        if (category) {
            query.category = category;
        }

        const results = await collection.find(query).toArray();

        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;