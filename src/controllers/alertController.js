const parserService = require('../services/parserService');

exports.receiveAlert = (req, res) => {
  const rawMessage = req.body.message;
  const parsed = parserService.parseMessage(rawMessage);

  console.log('📥 Raw Alert:', rawMessage);
  console.log('📤 Parsed:', parsed);

  res.status(200).json({ status: 'received', parsed });
};
