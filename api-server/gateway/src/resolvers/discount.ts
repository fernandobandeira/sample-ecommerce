import axios from 'axios';

export default ({ Query }) => {
  return {
    Discount: {
      products: ({ _id }) =>
        Query.discountProducts(undefined, { id: _id }),
      categories: ({ _id }) =>
        Query.discountCategories(undefined, { id: _id }),
    },
  };
};
