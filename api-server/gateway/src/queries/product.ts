import axios from 'axios';

export default (baseURL) => {
  return {
    products: () =>
      axios.get(`${baseURL}/`)
        .then(response => response.data.products),
    product: (root, { id }) =>
      axios.get(`${baseURL}/${id}`)
        .then(response => response.data.product),
    categoryProducts: (root, { id }) =>
      axios.get(`${baseURL}/category/${id}`)
        .then(response => response.data.products),
    discountProducts: (root, { id }) =>
      axios.get(`${baseURL}/discount/${id}`)
        .then(response => response.data.products),
  };
};
