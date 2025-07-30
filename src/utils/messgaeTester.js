const axios = require('axios');

const messages = [
  "Room 314B: John Doe – Heart Rate Critical",
  "Room 201A: Jane Smith – Code Blue",
  "ER Triage: Patient X – High Fever",
  "OR3: Dr. Adams – Procedure Delay",
  "ICU5: Monitor 02 – Oxygen Drop",
  "Lobby 1 – Missing colon separator",
  "Room 100: No Dash",
  "Room 9B: Mike Jones - Flatline", // test wrong dash
  " Room 401C:   Linda Shaw   –   Dizziness ",
  "Just some random text"
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
