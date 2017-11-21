import axios from 'axios';

export default (baseURL) => {
  return {
    discounts: () =>
      axios.get(`${baseURL}/`)
        .then(response => response.data.discounts),
    discount: (root, { id }) =>
      axios.get(`${baseURL}/${id}`)
        .then(response => response.data.discount),
  };
};
