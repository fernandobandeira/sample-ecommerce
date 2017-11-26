import * as q from 'q';
import * as logger from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose = require('mongoose');
import schema from './schema';
import routes from './routes';

export class App {
  public app: express.Application;
  public model: mongoose.Model<any>;

  constructor(config) {
    this.config(config);

    routes(this);
  }

  private config(
    { MONGODB_URI } : { MONGODB_URI: string },
) {
    global.Promise = q.Promise;
    mongoose.Promise = global.Promise;

    const connection = mongoose.createConnection(MONGODB_URI);
    this.model = connection.model('Order', schema);
  
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(logger('dev'));
  }
}
