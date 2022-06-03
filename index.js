const express = require('express');
const app = express();
require('dotenv').config();
require('./connection/conn');
const bodyparser = require('body-parser');
const user = require('./routes/user');
const job = require('./routes/job');
const org = require('./routes/orgr');

app.use(express.json());
app.use(bodyparser.json());
app.use('/user', user);
app.use('/job', job);
app.use('/org', org);

app.get('/', (req, res) => {
  res.send('hello world !');
});

app.listen(process.env.PORT, () =>
  console.log(`app is listening on port ${process.env.PORT}`)
);
