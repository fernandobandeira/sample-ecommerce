import product from './product';

export default {
  Mutation: {
    ...product('http://192.168.99.101:3001'),
  },
};
