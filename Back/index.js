const express = require('express');
const path = require('path');
require('dotenv').config();

const { dbConnection } = require('./database/config');

const cors = require('cors');
const app = express();

dbConnection();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`El servidor se escucha en el puerto http://localhost:${process.env.PORT}`);
});
