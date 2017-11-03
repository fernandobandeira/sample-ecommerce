import 'jest';
import * as request from 'supertest';
import { ObjectId } from 'mongodb';
import { App } from '../src/app';

const seed = [
  {
    _id: new ObjectId().toHexString(),
    name: 'test slug',
    active: false,
    description: 'test description',
  },
  {
    _id: new ObjectId().toHexString(),
    name: 'test2',
    active: true,
    description: 'test description',
  },
];

const { app, model } = new App({
  MONGODB_URI: 'mongodb://localhost:27017/EcommerceTest',
});

beforeEach(() => model.remove({}).then(() => model.create(seed)));

describe('GET /', () => {
  test('It should list all categories', () => {
    return request(app).get('/').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.categories).toMatchObject(seed);
    });
  });
});

describe('GET /:id', () => {
  test('It should return a single category', () => {
    const [category] = seed;

    return request(app).get(`/${category._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.category).toMatchObject(category);
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
  test('It should create a category', () => {
    const category = {
      _id: new ObjectId().toHexString(),
      name: 'test post',
      active: true,
      description: 'testing it',
    };

    return request(app).post('/').send(category).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.category).toMatchObject(category);
    });
  });

  test('It should not create a category when missing required data', () => {
    const category = {
      active: true,
      description: 'testing it',
    };

    return request(app).post('/').send(category).then((response) => {
      expect(response.status).toBe(400);
    });
  });
});

describe('PATCH /:id', () => {
  test('It should update the category', () => {
    const category = {
      ...seed[0],
      name: 'test update',
    };

    return request(app).patch(`/${category._id}`).send(category).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.category).toMatchObject(category);
    });
  });

  test('It should return a 409 when patching an outdated category', () => {
    const category = {
      ...seed[0],
      __v: -2,
    };

    return request(app).patch(`/${category._id}`).send(category).then((response) => {
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
  test('It should delete the category', () => {
    const [category] = seed;

    return request(app).delete(`/${category._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.category).toMatchObject(category);
      expect(response.body.category.deleted).toBe(true);
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
