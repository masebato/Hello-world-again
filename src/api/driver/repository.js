const db = require('../../db');
const { TABLES } = require('../../../constants');

const getTrip = (riderId) => {
  return db
    .select()
    .from(TABLES.TRIP)
    .innerJoin(
      TABLES.RIDER,
      `${TABLES.TRIP}.FK_RIDER`,
      `${TABLES.RIDER}.ID_RIDER`
    )
    .where({
      [`${TABLES.TRIP}.ID_TRIP`]: riderId,
    });
};

const updateTrip = (trip) => {
  return db(TABLES.TRIP).where({ ID_TRIP: trip.tripId }).update({
    LAT_FINISH: trip.latFinish,
    LON_FINISH: trip.lonFinish,
    DATE_FINISH: trip.dateFinish,
    COST_TRIP: trip.costTrip,
    DISTANCE_TRIP: trip.distanceTrip,
    STATE_TRIP: 'F',
  });
};

module.exports = { getTrip, updateTrip };
