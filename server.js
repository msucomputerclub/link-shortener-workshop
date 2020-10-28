const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

const connectDB = require('./utils/db');

const router = require('./routes');

app.use(express.static(path.join(__dirname, 'public'))); //set public folder to send our static website
app.use(cors()); // revent same source complains
app.use(express.json()); // parse body and to receive the json data

connectDB();
router(app);

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});
