const parserService = require('../services/parserService');
const Alert = require('../models/Alert');

exports.receiveAlert = async (req, res) => {
  const rawMessage = req.body.message;
  const parsed = parserService.parseMessage(rawMessage);

  console.log('📥 Raw Alert:', rawMessage);
  console.log('📤 Parsed:', parsed);

  try {
    const saved = await Alert.create({ rawMessage, parsed });
    res.status(200).json({ status: 'saved', alertId: saved._id });
  } catch (err) {
    console.error('❌ Error saving to DB:', err);
    res.status(500).json({ error: 'Failed to save alert' });
  }
};
