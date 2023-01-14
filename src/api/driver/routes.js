const router = require('express').Router();
const controller = require('./controller');

router.post('/finish', controller.finishRide);

module.exports = router;
