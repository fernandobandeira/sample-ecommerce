import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';
import * as cors from 'cors';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(cors());
    this.app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({ 
      schema,
      context: {
        authorization: request.headers.authorization,
      },
    })));
    this.app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
    }));
  }
}
