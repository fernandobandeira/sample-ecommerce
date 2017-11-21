import axios from 'axios';

export default (baseURL) => {
  return {
    categories: () =>
      axios.get(`${baseURL}/`)
        .then(response => response.data.categories),
    category: ({ id }) =>
      axios.get(`${baseURL}/${id}`)
        .then(response => response.data.category),
  };
};
