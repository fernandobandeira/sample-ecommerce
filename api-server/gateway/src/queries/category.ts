import axios from 'axios';

export default (baseURL) => {
  return {
    categories: () =>
      axios.get(`${baseURL}/`)
        .then(response => response.data.categories),
    category: (root, { id }) =>
      axios.get(`${baseURL}/${id}`)
        .then(response => response.data.category),
    discountCategories: (root, { id }) =>
      axios.get(`${baseURL}/discount/${id}`)
        .then(response => response.data.categories),
  };
};
