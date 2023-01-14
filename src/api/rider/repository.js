const db = require('../../db');
const { TABLES } = require('../../../constants');

const requestRider = async (trip) => {
  const trx = await db.transaction();
  try {
    const [id] = await trx(TABLES.TRIP).insert({
      FK_RIDER: trip.riderId,
      FK_DRIVER: 1,
      LAT_START: trip.latStart,
      LON_START: trip.lonStart,
    });

    const rowInserted = await trx
      .select()
      .from(TABLES.TRIP)
      .where({
        [`${TABLES.TRIP}.ID_TRIP`]: id,
      });

    await trx.commit();

    return rowInserted;
  } catch (error) {
    trx.rollback({ error });
    throw error;
  }
};

const validateAvailability = async (riderId) => {
  const validation = await db
    .select(`${TABLES.TRIP}.ID_TRIP`)
    .from(TABLES.TRIP)
    .where({
      [`${TABLES.TRIP}.FK_RIDER`]: riderId,
      [`${TABLES.TRIP}.STATE_TRIP`]: 'A',
    });

  return !validation.length ? true : false;
};

module.exports = { requestRider, validateAvailability };
