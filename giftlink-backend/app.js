const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const giftRoutes = require("./routes/giftRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api", giftRoutes);
app.use("/api", searchRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3060;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});