const request = require('supertest');
const { stub } = require('sinon');
const app = require('../../../server');
const domain = require('./domain');

describe('POST /finish', () => {
  const endTripStub = stub(domain, 'endTrip');

  beforeAll(() => {
    endTripStub.reset();
  });

  it('should end a trip', async () => {
    const payload = {
      tripId: 4,
      latStart: '1.498889',
      lonStart: '-75.724273',
    };

    endTripStub.returns({
      costTrip: 4642,
      distanceTrip: 1142,
      dateFinish: '2023-01-14 00:58:24',
    });

    const response = await request(app)
      .post('/driver/finish')
      .send(payload)
      .expect(200);

    expect(response.body).toEqual({
      MESSAGE: 'The trip has been ended',
      COST: 4642,
      DISTANCE: '1142 m',
      DATE_END: '2023-01-14 00:58:24',
    });
  });
});
