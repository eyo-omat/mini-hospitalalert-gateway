const axios = require('axios');

const messages = [
  // Format A: Standard Room Format
  "Room 314B: John Doe – Heart Rate Critical",
  "Room 201A: Jane Smith – Code Blue",
  "Room 125A: Patient X – Needs Assistance",
  "ICU3: Monitor 3 – Oxygen Drop",
  "OR2: Dr. Adams – Procedure Delay",
  "ER Triage: Nurse Johnson – Seizure Detected",

  // Format B: NaviCare-style (facility + room + bed)
  "General301:1 Code Blue",
  "EastWing205:2 Nurse Needed",
  "WestUnit102:1 Bed Alarm",
  "NorthWing310:2 Fall Detected",

  // Format C: Pillow + Room + Bed
  "100+103+1 Code Blue",
  "200+210+2 Patient needs water",
  "150+220+1 Medication Alert",
  "300+305+2 Breathing Irregularity",

  // Intentionally malformed or edge case messages
  "Lobby 1 – Missing colon separator",
  "Room 100: No Dash",
  "Room 9B: Mike Jones - Flatline", // wrong dash
  " Room 401C:   Linda Shaw   –   Dizziness ",
  "Just some random text",
  "General:301 Code Blue", // bad format
  "112+120+X Code Blue", // bad bed number
  "MainEntrance:Security – Assistance Needed"
];

const sendMessages = async () => {
  for (const msg of messages) {
    try {
      const res = await axios.post("http://localhost:3000/alerts", {
        message: msg
      });
      console.log(`✅ Sent: "${msg}" → Saved with ID: ${res.data.alertId}`);
    } catch (err) {
      console.error(`❌ Failed: "${msg}" →`, err.response?.data || err.message);
    }
  }
};

sendMessages();