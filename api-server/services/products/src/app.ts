import * as q from 'q'
import * as logger from 'morgan'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import mongoose = require('mongoose')
import ProductSchema from './schemas/product'
import routes from './routes/product'

export class App {
  public app: express.Application
  public Product

  constructor(config) {
    this.config(config)

    routes(this)
  }

  private config({ MONGODB_URI }) {
    global.Promise = q.Promise
    mongoose.Promise = global.Promise

    const connection = mongoose.createConnection(MONGODB_URI)
    this.Product = connection.model('Product', ProductSchema)
  
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(logger('dev'))
  }
}
