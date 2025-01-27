const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  recipient: {
    name: { type: String, required: true },
    email: { type: String, default: '' },
  },
  message: {
    title: { type: String, default: '' },
    description: { type: String, required: true },
  },
  from: { type: String, default: '' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);

// const MessageSchema = new mongoose.Schema({
//   recipient: {
//     name: { type: String, required: true },
//     email: { type: String, default: '' },
//   },
//   message: { type: String, required: true }, // Flattened to a single string
//   from: { type: String, default: '' },
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Message', MessageSchema);