import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

const connectToDatabase = async () => {
  if (mongoose.connections[0]?.readyState) {
    // Already connected
    return mongoose.connections[0];
  }

  // Create new connection
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDatabase;
