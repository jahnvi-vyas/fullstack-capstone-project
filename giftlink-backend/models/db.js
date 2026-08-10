const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "giftDB";

let dbInstance;

async function connectToDatabase() {
    // Task 1: Connect to MongoDB
    await client.connect();

    // Task 2: Connect to giftDB
    dbInstance = client.db(dbName);

    // Task 3: Return database instance
    return dbInstance;
}

module.exports = connectToDatabase;