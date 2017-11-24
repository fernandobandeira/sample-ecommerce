import axios from 'axios';

export default (baseURL) => {
  return {
    createDiscount: (root, { discount }) =>
      axios.post(`${baseURL}/`, discount)
        .then(response => response.data.discount),
    updateDiscount: (root, { id, discount }) =>
      axios.patch(`${baseURL}/${id}`, discount)
        .then(response => response.data.discount),
    deleteDiscount: (root, { id }) =>
      axios.delete(`${baseURL}/${id}`)
        .then(response => response.data.discount),
  };
};
