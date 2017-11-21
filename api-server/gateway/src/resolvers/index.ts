import { merge } from 'lodash';
import queries from '../queries';
import product from './product';
import category from './category';
import discount from './discount';

export default {
  ...queries,
  ...merge(
    product(queries),
    category(queries),
    discount(queries),
  ),
};
