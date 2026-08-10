const express = require("express");
const router = express.Router();

const natural = require("natural");

router.post("/", (req, res) => {
    try {
        const { sentence } = req.body;

        const analyzer = new natural.SentimentAnalyzer(
            "English",
            natural.PorterStemmer,
            "afinn"
        );

        const analysisResult = analyzer.getSentiment(
            sentence.split(" ")
        );

        let sentiment = "neutral";

        if (analysisResult < 0) {
            sentiment = "negative";
        } else if (analysisResult >= 0 && analysisResult <= 0.33) {
            sentiment = "neutral";
        } else {
            sentiment = "positive";
        }

        res.status(200).json({
            sentimentScore: analysisResult,
            sentiment: sentiment
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error performing sentiment analysis"
        });
    }
});

module.exports = router;