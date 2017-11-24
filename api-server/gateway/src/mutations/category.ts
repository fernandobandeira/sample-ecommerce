import axios from 'axios';

export default (baseURL) => {
  return {
    createCategory: (root, { category }) =>
      axios.post(`${baseURL}/`, category)
        .then(response => response.data.category),
    updateCategory: (root, { id, category }) =>
      axios.patch(`${baseURL}/${id}`, category)
        .then(response => response.data.category),
    deleteCategory: (root, { id }) =>
      axios.delete(`${baseURL}/${id}`)
        .then(response => response.data.category),
  };
};
