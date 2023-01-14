const repository = require('./repository');

const createTrip = async (trip) => {
  const validateAvailability = await repository.validateAvailability(
    trip.riderId
  );

  if (!validateAvailability) {
    return [];
  }
  return repository.requestRider(trip);
};

module.exports = { createTrip };
