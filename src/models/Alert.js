const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  rawMessage: { type: String, required: true },
  parsed: {
    room: String,
    patient: String,
    event: String
  },
  receivedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
