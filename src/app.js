const express = require('express');
const bodyParser = require('body-parser');
const alertRoutes = require('./routes/alertRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/alerts', alertRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚑 Mini Hospital Gateway running on port ${PORT}`);
});
