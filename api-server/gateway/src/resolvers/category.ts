import axios from 'axios';

export default ({ Query }) => {
  return {
    Category: {
      products: ({ _id }) =>
        Query.categoryProducts(undefined, { id: _id }),
      discounts: ({ discounts }) =>
        Promise.all(discounts.map(id => Query.discount(undefined, { id }))),
    },
  };
};
