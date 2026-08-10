const express = require("express");

const app = express();

app.use(express.json());

// Import gift routes
const giftRoutes = require("./routes/giftRoutes");

// Connect gift routes
app.use("/api/gifts", giftRoutes);

const PORT = 3060;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});