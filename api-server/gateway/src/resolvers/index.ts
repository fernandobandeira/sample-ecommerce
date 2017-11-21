import { merge } from 'lodash';
import queries from '../queries';
import product from './product';

export default {
  ...queries,
  ...merge(
    product(queries),
  ),
};
