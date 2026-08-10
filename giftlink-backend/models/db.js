const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectToDatabase() {
    await client.connect();
    return client.db("giftsdb");
}

module.exports = { connectToDatabase };