import axios from 'axios';

export default ({ Query }) => {
  return {
    Product: {
      categories: ({ categories }) =>
        Promise.all(categories.map(id => Query.category({ id }))),
    },
  };
};
