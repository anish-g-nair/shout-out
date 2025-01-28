const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState) {
    // Already connected
    return mongoose.connection;
  }

  // Create a new connection
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDatabase;
