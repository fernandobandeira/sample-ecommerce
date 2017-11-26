import axios from 'axios';

export default (baseURL) => {
  return {
    createUser: (root, { user }) =>
      axios.post(`${baseURL}/`, user)
        .then(response => response.data.user),
    updateUser: (root, { id, user }) =>
      axios.patch(`${baseURL}/${id}`, user)
        .then(response => response.data.user),
    deleteUser: (root, { id }) =>
      axios.delete(`${baseURL}/${id}`)
        .then(response => response.data.user),
  };
};
