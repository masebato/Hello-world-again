const { stub } = require('sinon');
const repository = require('./repository');
const domain = require('./domain');

describe('createTrip', () => {
  const validateAvailabilityStub = stub(repository, 'validateAvailability');
  const requestRiderStub = stub(repository, 'requestRider');

  beforeAll(() => {
    validateAvailabilityStub.reset();
    requestRiderStub.reset();
  });

  it('should save a new trip', async () => {
    const trip = {
      riderId: 1,
      latStart: '1.488664',
      lonStart: '-75.725293',
    };
    validateAvailabilityStub.returns(true);
    requestRiderStub.returns({
      DATE_START: '2023-01-14T05:58:16.800Z',
      ID_TRIP: 5,
    });

    await domain.createTrip(trip);
    validateAvailabilityStub.calledOnceWithExactly(1);
  });
});
