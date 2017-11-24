import category from './category';
import product from './product';
import discount from './discount';

export default {
  Mutation: {    
    ...product('http://192.168.99.101:3001'),
    ...category('http://192.168.99.101:3002'),
    ...discount('http://192.168.99.101:3003'),
  },
};
