import 'jest';
import * as request from 'supertest';
import { ObjectId } from 'mongodb';
import { App } from '../src/app';

const seed = [
  {
    _id: new ObjectId().toHexString(),
    products: [
      {
        name: 'product1',
      },
    ],
    user: {
      username: 'test',
    },
  },
  {
    _id: new ObjectId().toHexString(),
    products: [
      {
        name: 'product2',
      },
    ],
    user: {
      username: 'test2',
    },
  },
];

const { app, model } = new App({
  MONGODB_URI: 'mongodb://localhost:27017/EcommerceTest',
});

beforeEach(() => model.remove({}).then(() => model.create(seed)));

describe('GET /', () => {
  test('It should list all orders', () => {
    return request(app).get('/').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.orders).toMatchObject(seed);
    });
  });
});

describe('GET /:id', () => {
  test('It should return a single order', () => {
    const [order] = seed;

    return request(app).get(`/${order._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.order).toMatchObject(order);
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
  test('It should create a order', () => {
    const order = {
      _id: new ObjectId().toHexString(),
      products: [{
        name: 'product',
      }],
      user: {
        username: 'test',
      },
    };

    return request(app).post('/').send(order).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.order).toMatchObject(order);
    });
  });

  test('It should not create a order when missing required data', () => {
    const order = {
      user: {
        username: 'test',
      },
    };

    return request(app).post('/').send(order).then((response) => {
      expect(response.status).toBe(400);
    });
  });
});
