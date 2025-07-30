exports.parseMessage = (message) => {
  const roomMatch = message.match(/Room\s+(\w+)/i);
  const nameMatch = message.match(/:\s+(.*?)\s+–/);
  const eventMatch = message.match(/–\s+(.*)/);

  return {
    room: roomMatch?.[1] || 'Unknown',
    patient: nameMatch?.[1] || 'Unknown',
    event: eventMatch?.[1] || 'Unknown',
  };
};
