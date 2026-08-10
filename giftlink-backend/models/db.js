const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("MONGO_URI is missing from .env");
}

const client = new MongoClient(uri);

let database = null;

async function connectToDatabase() {
    try {
        if (database) {
            return database;
        }

        await client.connect();

        database = client.db("giftsdb");

        console.log("MongoDB connected successfully");

        return database;
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);

        throw error;
    }
}

module.exports = {
    connectToDatabase
};