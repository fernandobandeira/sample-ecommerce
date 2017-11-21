import axios from 'axios';

export default (baseURL) => {
  return {
    products: () =>
      axios.get(`${baseURL}/`)
        .then(response => response.data.products),
    product: ({ id }) =>
      axios.get(`${baseURL}/${id}`)
        .then(response => response.data.product),
  };
};
