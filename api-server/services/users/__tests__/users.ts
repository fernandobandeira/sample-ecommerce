import 'jest';
import * as request from 'supertest';
import { ObjectId } from 'mongodb';
import { App } from '../src/app';

const seed = [
  {
    _id: new ObjectId().toHexString(),
    username: 'test user',
    password: 'secret',
    admin: true,
  },
  {
    _id: new ObjectId().toHexString(),
    username: 'test user2',
    password: 'secret',
  },
];

const { app, model } = new App({
  MONGODB_URI: 'mongodb://localhost:27017/EcommerceTest',
});

beforeEach(() => model.remove({}).then(() => model.create(seed)));

describe('GET /', () => {
  test('It should list all users', () => {
    return request(app).get('/').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.users[0].password).not.toBe(seed[0].password);
    });
  });
});

describe('GET /:id', () => {
  test('It should return a single user', () => {
    const [user] = seed;

    return request(app).get(`/${user._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.user.username).toBe(user.username);
      expect(response.body.user.password).not.toBe(user.password);
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
  test('It should create a user', () => {
    const user = {
      _id: new ObjectId().toHexString(),
      username: 'test user3',
      password: 'secret',
    };

    return request(app).post('/').send(user).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.user.username).toBe(user.username);
      expect(response.body.user.password).not.toBe(user.password);
    });
  });

  test('It should not create an user when missing required data', () => {
    const user = {
      password: 'secret',
    };

    return request(app).post('/').send(user).then((response) => {
      expect(response.status).toBe(400);
    });
  });
});

describe('PATCH /:id', () => {
  test('It should update the user', () => {
    const user = {
      ...seed[0],
      username: 'test update',
    };

    return request(app).patch(`/${user._id}`).send(user).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.user.username).toBe(user.username);
    });
  });

  test('It should return a 409 when patching an outdated user', () => {
    const user = {
      ...seed[0],
      _version: -2,
    };

    return request(app).patch(`/${user._id}`).send(user).then((response) => {
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
  test('It should delete the user', () => {
    const [user] = seed;

    return request(app).delete(`/${user._id}`).then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.user._id).toBe(user._id);
      expect(response.body.user.deleted).toBe(true);
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
