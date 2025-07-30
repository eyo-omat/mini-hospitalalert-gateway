const normalizeAlert = require('./normalizeAlert');

exports.parseMessage = (message) => {
  if (!message || typeof message !== 'string') return null;

  const patterns = [
    /*
  ──────────────────────────────────────────────────────
  FORMAT A: Standard Room Format
  Example: "Room 314B: John Doe – Heart Rate Critical"
  
  Regex Breakdown:
    ^(.+?):       → Group 1: Room/location (e.g., "Room 314B")
    \s+           → One or more spaces
    (.+?)         → Group 2: Patient/device name (e.g., "John Doe")
    \s+–\s+       → En dash surrounded by spaces
    (.+)          → Group 3: Event/alert (e.g., "Heart Rate Critical")
  ──────────────────────────────────────────────────────
  */
    {
      format: 'StandardRoom',
      regex: /^(.+?):\s+(.+?)\s+–\s+(.+)$/,
      extract: (match) => ({
        room: match[1].trim(),
        subject: match[2].trim(),
        event: match[3].trim()
      })
    },
    /*
  ──────────────────────────────────────────────────────
  FORMAT B: FacilityRoom:Bed Format (NaviCare-style)
  Example: "General301:1 Code Blue"
  
  Regex Breakdown:
    ^([A-Za-z]+)  → Group 1: Facility name (e.g., "General")
    (\d+)         → Group 2: Room number (e.g., "301")
    :             → Colon separator
    (\d+)         → Group 3: Bed number (e.g., "1")
    \s+           → One or more spaces
    (.+)          → Group 4: Event/alert (e.g., "Code Blue")
  ──────────────────────────────────────────────────────
  */
    {
      format: 'FacilityRoomBed',
      regex: /^([A-Za-z]+)(\d+):(\d+)\s+(.+)$/,
      extract: (match) => ({
        facility: match[1],
        room: match[2],
        bed: match[3],
        event: match[4].trim()
      })
    },
  /*
  ──────────────────────────────────────────────────────
  FORMAT C: Pillow+Room+Bed Format
  Example: "100+103+1 Code Blue"
  
  Regex Breakdown:
    ^(\d+)        → Group 1: Pillow number (e.g., "100")
    \+(\d+)       → Group 2: Room number (e.g., "103")
    \+(\d+)       → Group 3: Bed number (e.g., "1")
    \s+           → One or more spaces
    (.+)          → Group 4: Event/alert (e.g., "Code Blue")
  ──────────────────────────────────────────────────────
  */
    {
      format: 'PillowRoomBed',
      regex: /^(\d+)\+(\d+)\+(\d+)\s+(.+)$/,
      extract: (match) => ({
        pillow: match[1],
        room: match[2],
        bed: match[3],
        event: match[4].trim()
      })
    }
  ];

  for (const { format, regex, extract } of patterns) {
    const match = message.match(regex);
    if (match) {
      const fields = extract(match);
      return normalizeAlert({ format, fields });
    }
  }

  return null; // No match found
};
