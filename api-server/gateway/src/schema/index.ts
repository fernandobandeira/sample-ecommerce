import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import * as product from './product';
import * as category from './category';
import * as discount from './discount';

const types = [];
const queries = [];
const mutations = [];

const schemas = [product, category, discount];

schemas.forEach((s) => {
  types.push(s.types);
  queries.push(s.queries);
  mutations.push(s.mutations);
});

const rootQuery = `
  type Query {
    ${queries.join('\n')}
  }
`;

const schemaDefinition = `
  schema {
    query: Query
  }
`;

export default makeExecutableSchema({
  resolvers,
  typeDefs: [schemaDefinition, rootQuery, types.join('\n')],  
});
