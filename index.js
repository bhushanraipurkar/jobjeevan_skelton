const express = require('express');
const app = express();
require('dotenv').config();
require('./connection/conn');

app.get('/', (req, res) => {
  res.send('hello world !');
});

app.listen(process.env.PORT, () =>
  console.log(`app is listening on port ${process.env.PORT}`)
);
