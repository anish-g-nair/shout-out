const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

let isConnected;

const connectToDatabase = async () => {
  try {
    if (isConnected) {
      return mongoose.connection;
    }

    if (mongoose.connection.readyState) {
      isConnected = true;
      return mongoose.connection;
    }

    const db = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Could not connect to database');
  }
};

module.exports = connectToDatabase;
