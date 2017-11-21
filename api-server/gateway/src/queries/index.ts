import product from './product';
import category from './category';
import discount from './discount';

export default {
  Query: {
    ...product('http://192.168.99.100:3001'),
    ...category('http://192.168.99.100:3002'),
    ...discount('http://192.168.99.100:3003'),
  },
};
