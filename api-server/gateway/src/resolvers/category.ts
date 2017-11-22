import axios from 'axios';
import { omit } from 'lodash';

export default function ({ Query }) {
  this.products = ({ _id }) =>
    Query.categoryProducts(undefined, { id: _id });
    
  this.discounts = ({ discounts }) =>
    Promise.all(discounts.map(id => Query.discount(undefined, { id })));

  return {
    Category: {
      ...omit(this, 'default'),
    },
  };
}
