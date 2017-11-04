import axios from 'axios';

export default (baseURL) => {
  axios.defaults.baseURL = baseURL;

  return {
    listProducts: () =>
      axios.get('/')
        .then(response => response.data.products),
    getProduct: ({ id }) =>
      axios.get(`/${id}`)
        .then(response => response.data.product),
  };
};
