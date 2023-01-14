const request = require('supertest');
const { stub } = require('sinon');
const app = require('../../../server');
const domain = require('./domain');

describe('POST /request', () => {
  const createTripStub = stub(domain, 'createTrip');

  beforeAll(() => {
    createTripStub.reset();
  });

  it('should start a trip RESPONSE 200', async () => {
    const payload = {
      riderId: 1,
      latStart: '1.488664',
      lonStart: '-75.725293',
    };
    createTripStub.returns([
      {
        DATE_START: '2023-01-14T05:58:16.800Z',
        ID_TRIP: 5,
      },
    ]);

    const response = await request(app)
      .post('/rider/request')
      .send(payload)
      .expect(200);

    expect(response.body).toEqual({
      MESSAGE: 'The trip has been started',
      DATE: '2023-01-14T05:58:16.800Z',
      ID_TRIP: 5,
    });
  });

  it('should response 424 When there is another trip in progress ', async () => {
    const payload = {
      riderId: 1,
      latStart: '1.488664',
      lonStart: '-75.725293',
    };
    createTripStub.returns([]);

    await request(app).post('/rider/request').send(payload).expect(424);
  });

  it('should response 422 When missing params ', async () => {
    const payload = {
      riderId: 1,
      lonStart: '-75.725293',
    };
    createTripStub.returns([]);

    await request(app).post('/rider/request').send(payload).expect(422);
  });
});
