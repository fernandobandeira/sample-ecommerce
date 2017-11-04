import * as product from './product';

const types = [];
const queries = [];
const mutations = [];

const schemas = [product];

schemas.forEach((s) => {
  types.push(s.types);
  queries.push(s.queries);
  mutations.push(s.mutations);
});

export default `
  ${types.join('\n')}

  type Query {
    ${queries.join('\n')}
  }
`;
