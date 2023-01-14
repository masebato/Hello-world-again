const repository = require('./repository');
const dayjs = require('dayjs');
const helper = require('../../helper');
const services = require('../../services');
const uuid = require('uuid');
const { COST } = require('../../../constants');

const endTrip = async (trips) => {
  const currentTime = dayjs();
  const [currentTrip] = await repository.getTrip(trips.tripId);

  const lastTime = dayjs(currentTrip.DATE_START).format('YYYY-MM-DD HH:mm:ss');

  const minutesDifference = currentTime.diff(lastTime, 'minute');

  const coordsStart = {
    latitude: currentTrip.LAT_START,
    longitude: currentTrip.LON_START,
  };

  const coordsEnd = {
    latitude: trips.latStart,
    longitude: trips.lonStart,
  };

  const distance = helper.haversineDistance(coordsStart, coordsEnd);

  const cost = caculateCost(distance, minutesDifference);

  const tripToUpdated = {
    tripId: trips.tripId,
    latFinish: trips.latStart,
    lonFinish: trips.lonStart,
    dateFinish: currentTime.format('YYYY-MM-DD HH:mm:ss'),
    costTrip: Math.trunc(cost),
    distanceTrip: distance,
  };
  await sendTransaction(currentTrip.PAYMENT_SOURCE, tripToUpdated.costTrip);
  await repository.updateTrip(tripToUpdated);

  return tripToUpdated;
};

const caculateCost = (distance, time) => {
  const costKm = distance * COST.DISTANCE;
  const costTime = time * COST.TIME;
  const costTotal = costKm + costTime + COST.BASE;

  return costTotal;
};

const sendTransaction = async (payment, cost) => {
  const cents = Number(cost) * 100;
  const payload = {
    amount_in_cents: cents,
    currency: 'COP',
    customer_email: 'example@gmail.com',
    payment_method: {
      installments: 1,
    },
    reference: uuid.v1().toString(),
    payment_source_id: payment,
  };

  await services.transations(payload);
};

module.exports = { endTrip };
