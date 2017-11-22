import { merge } from 'lodash';
import queries from '../queries';
import mutations from '../mutations';
import product from './product';
import category from './category';
import discount from './discount';

export default {
  ...queries,
  ...mutations,
  ...merge(
    product(queries),
    category(queries),
    discount(queries),
  ),
};
