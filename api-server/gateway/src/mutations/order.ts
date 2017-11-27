import axios from 'axios';

export default (baseURL) => {
  return {
    createOrder: (root, { order }) =>
      axios.post(`${baseURL}/`, order)
        .then(response => response.data.order),
  };
};
