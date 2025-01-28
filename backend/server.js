const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const messageRoutes = require('./routes/messages'); // Import the updated routes

require('dotenv').config();

const app = express();
// Configure CORS middleware
app.use(
  cors({
    origin: 'https://shout-out-fe-app.vercel.app', // Allow only this origin to access the server
    methods: ['GET', 'POST'], // Allowed HTTP methods
    credentials: true, // Enable cookies and other credentials in requests
  })
);
app.use(bodyParser.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/messagesDB';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use(messageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
