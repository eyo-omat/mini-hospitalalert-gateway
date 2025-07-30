const mongoose = require('mongoose');

const ParsedSchema = new mongoose.Schema({
  location: String,
  subject: String,
  event: String,
  room: String,
  bed: String,
  facility: String,
  pillow: String,
  format: String,
  type: String
}, { _id: false });

const AlertSchema = new mongoose.Schema({
  rawMessage: { type: String, required: true },
  parsed: ParsedSchema,
  receivedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
