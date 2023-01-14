const express = require('express');
const routes = express.Router();

const rider = require('./rider');
const driver = require('./driver');

routes.use('/rider', rider);
routes.use('/driver', driver);

module.exports = routes;
