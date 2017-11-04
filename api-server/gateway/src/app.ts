import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import schema from './schemas/schema';
import controller from './controllers/controller';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use('/graphql', graphqlHTTP({
      schema: buildSchema(schema),
      rootValue: controller,
      graphiql: true,
    }));
  }
}
