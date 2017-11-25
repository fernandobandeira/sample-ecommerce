import axios from 'axios';
import { omit } from 'lodash';

export default function ({ Query }) {
  this.products = root =>
    this.getProducts(root)
      .then(products => products.map(p => !p.deleted ? p._id : undefined));

  this.categories = root =>
    this.getCategories(root)
      .then(categories => categories.map(c => !c.deleted ? c._id : undefined));

  this.getProducts = ({ _id }) =>
    Query.discountProducts(undefined, { id: _id });

  this.getCategories = ({ _id }) =>
    Query.discountCategories(undefined, { id: _id });

  return {
    Discount: {
      ...omit(this, 'default'),
    },
  };
}
