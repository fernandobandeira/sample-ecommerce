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

const query = `
  type Query {
    ${queries.join('\n')}
  }
`;

const mutation = `
  type Mutation {
    ${mutations.join('\n')}
  }
`;

const schema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  resolvers,
  typeDefs: [schema, query, mutation, types.join('\n')],  
});
