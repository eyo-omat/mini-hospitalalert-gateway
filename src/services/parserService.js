exports.parseMessage = (message) => {
  if (!message || typeof message !== 'string') return null;

  // Regex to match "Room 314B: John Doe – Heart Rate Critical"
  const regex = /^(.+?):\s+(.+?)\s+–\s+(.+)$/;
  const match = message.match(regex);

  if (!match) return null;

  return {
    room: match[1].trim(),
    patient: match[2].trim(),
    event: match[3].trim()
  };
};
