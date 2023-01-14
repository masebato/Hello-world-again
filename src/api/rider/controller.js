const domain = require('./domain');
const { MESSAGES } = require('../../../constants');

const requestRide = async (req, res) => {
  try {
    const trip = req.body;

    if (!trip.latStart || !trip.lonStart || !trip.riderId) {
      return res.status(422).send(MESSAGES.MISSING_PARAMS);
    }
    const [tripCreated] = await domain.createTrip(trip);

    if (!tripCreated) {
      return res.status(424).send(MESSAGES.AVAILABILITY_FAIL);
    }
    return res
      .status(200)
      .send({
        MESSAGE: MESSAGES.TRIP_START,
        DATE: tripCreated.DATE_START,
        ID_TRIP: tripCreated.ID_TRIP,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { requestRide };
