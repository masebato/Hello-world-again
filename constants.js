const TABLES = {
  DRIVER: 'driver',
  TRIP: 'trip',
  RIDER: 'rider',
};

const MESSAGES = {
  MISSING_PARAMS: 'The request missing params',
  TRIP_START: 'The trip has been started',
  TRIP_END: 'The trip has been ended',
  AVAILABILITY_FAIL: 'there is another trip in progress',
};

const COST = {
  TIME: 200,
  DISTANCE: 1,
  BASE: 3500,
};

module.exports = { TABLES, MESSAGES, COST };
