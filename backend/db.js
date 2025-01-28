const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

// Track the connection status
let isConnected;

const connectToDatabase = async () => {
  if (isConnected) {
    // Use the existing connection
    return mongoose.connection;
  }

  if (mongoose.connection.readyState) {
    // If Mongoose already has an active connection, use it
    isConnected = true;
    return mongoose.connection;
  }

  // If no connection exists, create one
  try {
    const db = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = connectToDatabase;
