const domain = require('./domain');
const { MESSAGES } = require('../../../constants');

const finishRide = async (req, res) => {
  try {
    const ride = req.body;

    const response = await domain.endTrip(ride);

    return res.status(200).send({
      MESSAGE: MESSAGES.TRIP_END,
      COST: response.costTrip,
      DISTANCE: response.distanceTrip + ' m',
      DATE_END: response.dateFinish,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { finishRide };
