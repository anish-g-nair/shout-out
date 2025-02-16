const express = require('express');
const Message = require('../models/message');
const router = express.Router();
// const connectToDatabase = require('../db.js');

const mongoose = require('mongoose');
// const mongoUri = 'mongodb+srv://devputler:JAC0ejgvHY3EGNJw@default.7oahe.mongodb.net/default?retryWrites=true&w=majority&appName=Default' || process.env.MONGO_URI;
const mongoUri = process.env.MONGODB_URI;

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

router.get('/', async (req, res) => {
  try {
    res.send('Ask me something else');
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all messages with optional filters
router.get('/messages', async (req, res) => {
  try {
    const filter = {};
    // Filter by recipient name if present
    if (req.query['recipient.name']) {
      filter['recipient.name'] = req.query['recipient.name'];
    }

    // Filter by date if present
    if (req.query.date) {
      const targetDate = new Date(req.query.date);  // Parse date from query
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));  // Start of the selected day
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));  // End of the selected day

      filter.date = {
        $gte: startOfDay, // Messages on or after the start of the selected date
        $lt: endOfDay,    // Messages before the end of the selected date
      };
    }
    
    // await connectToDatabase();
    
    // Fetch messages from database based on filter
    const messages = await Message.find(filter).sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new messages
router.post('/messages', async (req, res) => {
  try {
    const transformedMessages = req.body.map((msg) => ({
      recipient: msg.recipient, // Use `recipient` object directly
      message: {
        title: msg.message.title || '', // Store title if provided
        description: msg.message.description || '', // Store description
      },
      from: msg.from || '', // Default to empty string if not provided
      date: msg.date || new Date(), // Ensure each message has a date field
    }));

    // await connectToDatabase();

    const savedMessages = await Message.insertMany(transformedMessages);
    res.status(201).json(savedMessages);
  } catch (error) {
    console.error('Error saving messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
