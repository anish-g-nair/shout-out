const express = require('express');
const Message = require('../models/message');
const router = express.Router();

// GET all messages with optional filters

router.get('/', async (req, res) => {
  try {
    res.send('Ask me something else');
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const filter = {};
res.send('Ask me something else');
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

    const savedMessages = await Message.insertMany(transformedMessages);
    res.status(201).json(savedMessages);
  } catch (error) {
    console.error('Error saving messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
