const express = require('express');
const bodyParser = require('body-parser');
const alertRoutes = require('./routes/alertRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/alerts', alertRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚑 Mini Hospital Gateway running on port ${PORT}`);
});
