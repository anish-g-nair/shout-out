const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const cors = require('cors');
const messageRoutes = require('./routes/messages'); // Import the updated routes

require('dotenv').config(); // Some comment to delete

const corsConfig = {
    origin: ['https://shout-out-fe-app.vercel.app'], // Allow only this origin to access the server
    // origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: '*',  // Allow these headers (add any custom headers if needed)
    // credentials: true, // Enable cookies and other credentials in requests
};
const app = express();
// Configure CORS middleware
app.options('*', cors(corsConfig))
app.use(cors(corsConfig));
app.use(bodyParser.json());

// MongoDB Connection
/* const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/messagesDB';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err)); */

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

// Routes
app.use(messageRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
