import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
    this.app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
    }));
  }
}
