const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const giftRoutes = require("./routes/giftRoutes");
app.use("/api/gifts", giftRoutes);

const searchRoutes = require("./routes/searchRoutes");
app.use("/api/search", searchRoutes);

const sentimentRoutes = require("./routes/sentimentRoutes");
app.use("/sentiment", sentimentRoutes);

const PORT = process.env.PORT || 3060;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});