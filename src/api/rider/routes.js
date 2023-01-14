const router = require('express').Router();
const controller = require('./controller');

router.post('/request', controller.requestRide);

module.exports = router;
