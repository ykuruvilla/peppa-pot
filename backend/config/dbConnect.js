const mongoose = require("mongoose");

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const projectName = process.env.MONGO_PROJECT_NAME;
const dbName = process.env.MONGO_DB_NAME;
const testing = process.env.testing;

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(
      `mongodb+srv://${userName}:${password}@${projectName}.wcj9a63.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log(`Mongodb connected ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
