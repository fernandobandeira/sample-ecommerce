import axios from 'axios';
import { omit } from 'lodash';

export default function ({ Query }) {
  this.products = ({ _id }) =>
    Query.discountProducts(undefined, { id: _id });

  this.categories = ({ _id }) =>
    Query.discountCategories(undefined, { id: _id });

  return {
    Discount: {
      ...omit(this, 'default'),
    },
  };
}
