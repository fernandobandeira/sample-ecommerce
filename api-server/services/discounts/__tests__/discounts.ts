import 'jest';
import * as request from 'supertest';
import { ObjectId } from 'mongodb';
import { App } from '../src/app';

const seed = [
  {
    _id: new ObjectId().toHexString(),
    name: 'test slug',
    active: false,
    percentage: 3,
  },
  {
    _id: new ObjectId().toHexString(),
    name: 'test2',
    active: true,
    percentage: 20.5,
  },
];

const { app, model } = new App({
  MONGODB_URI: 'mongodb://localhost:27017/EcommerceTest',
});

beforeEach(() => model.remove({}).then(() => model.create(seed)));

describe('GET /', () => {
  test('It should list all discounts', () => {
    return request(app).get('/').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.discounts).toMatchObject(seed);
    });
  });
});

describe('GET /:id', () => {
  test('It should return a single discount', () => {
    const [discount] = seed;

    return request(app).get(`/${discount._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.discount).toMatchObject(discount);
    });
  });

  test('It should return a 404', () => {
    return request(app).get(`/${new ObjectId().toHexString()}`).then((response) => {
      expect(response.status).toBe(404);
    });
  });

  test('It should return a 400', () => {
    return request(app).get(`/123456`).then((response) => {
      expect(response.status).toBe(400);
    });
  });
});

describe('POST /', () => {
  test('It should create a discount', () => {
    const discount = {
      _id: new ObjectId().toHexString(),
      name: 'test post',
      active: true,
      percentage: 20.5,
    };

    return request(app).post('/').send(discount).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.discount).toMatchObject(discount);
    });
  });

  test('It should not create a discount when missing required data', () => {
    const discount = {
      active: true,
      description: 'testing it',
    };

    return request(app).post('/').send(discount).then((response) => {
      expect(response.status).toBe(400);
    });
  });
});

describe('PATCH /:id', () => {
  test('It should update the discount', () => {
    const discount = {
      ...seed[0],
      name: 'test update',
    };

    return request(app).patch(`/${discount._id}`).send(discount).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.discount).toMatchObject(discount);
    });
  });

  test('It should return a 409 when patching an outdated discount', () => {
    const discount = {
      ...seed[0],
      _version: -2,
    };

    return request(app).patch(`/${discount._id}`).send(discount).then((response) => {
      expect(response.status).toBe(409);
    });
  });

  test('It should return a 404', () => {
    return request(app).patch(`/${new ObjectId().toHexString()}`).then((response) => {
      expect(response.status).toBe(404);
    });
  });

  test('It should return a 400', () => {
    return request(app).patch(`/123456`).then((response) => {
      expect(response.status).toBe(400);
    });
  });
});

describe('DELETE /:id', () => {
  test('It should delete the discount', () => {
    const [discount] = seed;

    return request(app).delete(`/${discount._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.discount).toMatchObject(discount);
      expect(response.body.discount.deleted).toBe(true);
    });
  });

  test('It should return a 404', () => {
    return request(app).delete(`/${new ObjectId().toHexString()}`).then((response) => {
      expect(response.status).toBe(404);
    });
  });

  test('It should return a 400', () => {
    return request(app).delete(`/123456`).then((response) => {
      expect(response.status).toBe(400);
    });
  });
});
