const express = require("express");
const natural = require("natural");

const app = express();

app.use(express.json());

app.post("/sentiment", (req, res) => {
    try {
        const { sentence } = req.query;

        if (!sentence) {
            return res.status(400).json({
                error: "Sentence is required"
            });
        }

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

        return res.status(200).json({
            sentimentScore: analysisResult,
            sentiment: sentiment
        });
    } catch (e) {
        return res.status(500).json({
            error: "Internal server error",
            details: e.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Sentiment server running on port ${PORT}`);
});