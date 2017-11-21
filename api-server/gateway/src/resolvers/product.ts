import axios from 'axios';

export default ({ Query }) => {
  return {
    Product: {
      categories: ({ categories }) =>
        Promise.all(categories.map(id => Query.category(undefined, { id }))),
      discounts: ({ discounts }) =>
        Promise.all(discounts.map(id => Query.discount(undefined, { id }))),
    },
  };
};
