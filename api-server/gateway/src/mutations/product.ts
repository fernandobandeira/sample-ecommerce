import axios from 'axios';

export default (baseURL) => {
  return {
    createProduct: (root, { product }) =>
      axios.post(`${baseURL}/`, product)
        .then(response => response.data.product),
    updateProduct: (root, { id, product }) =>
      axios.patch(`${baseURL}/${id}`, product)
        .then(response => response.data.product),
    deleteProduct: (root, { id }) =>
      axios.delete(`${baseURL}/${id}`)
        .then(response => response.data.product),
    updateDiscountProducts: (root, { id, products }) =>
      axios.patch(`${baseURL}/discount/${id}`, { products })
        .then(response => response.data.products),
  };
};
