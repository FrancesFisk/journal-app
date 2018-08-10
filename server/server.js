'use strict';

const express = require('express');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

const app = express();

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.get('/api/main', (req, res) => {
  res.json({
      successful: true
  });
});

app.listen(3000);