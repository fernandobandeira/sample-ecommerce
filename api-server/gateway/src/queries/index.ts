import product from './product';
import category from './category';
import discount from './discount';
import user from './user';

export default {
  Query: {
    ...product('http://192.168.99.101:3001'),
    ...category('http://192.168.99.101:3002'),
    ...discount('http://192.168.99.101:3003'),
    ...user('http://192.168.99.101:3004'),
  },
};
