import 'jest'
import * as request from 'supertest'
import { ObjectId } from 'mongodb'
import { App } from '../src/app'

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

const { app, Product } = new App({ MONGODB_URI: 'mongodb://localhost:27017/EcommerceTest' })

beforeEach(() => Product.remove({}).then(() => Product.create(seed)))

describe('GET /', () => {
    test('It should list all products', () => {
        return request(app).get('/').then(response => {
            expect(response.status).toBe(200)
            expect(response.body.products).toMatchObject(seed)
        })
    });
})

describe('GET /:id', () => {
    test('It should return a single product', () => {
        const [product] = seed
        return request(app).get(`/${product._id}`).then(response => {
            expect(response.status).toBe(200)
            expect(response.body.product).toMatchObject(product)
        })
    })
})
