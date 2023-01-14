const sinon = require('sinon');
const dayjs = require('dayjs');
const { endTrip } = require('./domain');
const repository = require('./repository');

jest.mock('dayjs', () => {
  return () => {
    return {
      format: () => '2022-01-01 12:00:00',
      diff: () => 60,
    };
  };
});

describe('endTrip', () => {
  beforeEach(() => {
    sinon.stub(repository, 'getTrip').resolves([
      {
        DATE_START: '2022-01-01 11:00:00',
        LAT_START: 1,
        LON_START: 2,
        PAYMENT_SOURCE: 'source',
      },
    ]);
    sinon.stub(repository, 'updateTrip').resolves();
  });

  afterEach(() => {
    repository.getTrip.restore();
    repository.updateTrip.restore();
  });

  it('should end the trip correctly', async () => {
    const trip = {
      tripId: 1,
      latStart: 3,
      lonStart: 4,
    };
    const expectedResult = {
      tripId: 1,
      latFinish: 3,
      lonFinish: 4,
      dateFinish: '2022-01-01 12:00:00',
      costTrip: 12,
      distanceTrip: 20,
    };
    const result = await endTrip(trip);
    expect(result).toEqual(expectedResult);
    expect(repository.getTrip.calledOnce).toBe(true);
    expect(repository.updateTrip.calledOnce).toBe(true);
  });
});
