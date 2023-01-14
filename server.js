const express = require('express'),
  app = express(),
  routes = require('./src/api'),
  bodyParser = require('body-parser'),
  cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(routes);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${req.method} ${req.url} ${error.message}`);
  }
  return res.status(500).send({ error: error.message });
});

module.exports = app;
