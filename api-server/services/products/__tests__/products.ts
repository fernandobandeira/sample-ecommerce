import 'jest';
import * as request from 'supertest';
import { ObjectId } from 'mongodb';
import { App } from '../src/app';

const seed = [
  {
    _id: new ObjectId().toHexString(),
    name: 'test slug',
    active: false,
    price: 10.50,
    description: 'test description',
  },
  {
    _id: new ObjectId().toHexString(),
    name: 'test2',
    active: true,
    price: 0,
    description: 'test description5',
  },
];

const { app, model } = new App({
  MONGODB_URI: 'mongodb://localhost:27017/EcommerceTest',
});

beforeEach(() => model.remove({}).then(() => model.create(seed)));

describe('GET /', () => {
  test('It should list all products', () => {
    return request(app).get('/').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.products).toMatchObject(seed);
    });
  });
});

describe('GET /:id', () => {
  test('It should return a single product', () => {
    const [product] = seed;

    return request(app).get(`/${product._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.product).toMatchObject(product);
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
  test('It should create a product', () => {
    const product = {
      _id: new ObjectId().toHexString(),
      name: 'test post',
      active: true,
      price: 52.40,
      description: 'testing it',
    };

    return request(app).post('/').send(product).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.product).toMatchObject(product);
    });
  });

  test('It should not create a product when missing required data', () => {
    const product = {
      active: true,
      price: 52.40,
      description: 'testing it',
    };

    return request(app).post('/').send(product).then((response) => {
      expect(response.status).toBe(400);
    });
  });
});

describe('PATCH /:id', () => {
  test('It should update the product', () => {
    const product = {
      ...seed[0],
      name: 'test update',
    };

    return request(app).patch(`/${product._id}`).send(product).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.product).toMatchObject(product);
    });
  });

  test('It should return a 409 when patching an outdated product', () => {
    const product = {
      ...seed[0],
      __v: -2,
    };

    return request(app).patch(`/${product._id}`).send(product).then((response) => {
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
  test('It should delete the product', () => {
    const [product] = seed;

    return request(app).delete(`/${product._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.product).toMatchObject(product);
      expect(response.body.product.deleted).toBe(true);
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
