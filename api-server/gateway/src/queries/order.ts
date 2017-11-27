import axios from 'axios';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

export default (baseURL) => {
  return {
    orders: () =>
      axios.get(`${baseURL}/`)
        .then(response => response.data.orders),
    order: (root, { id }) =>
      axios.get(`${baseURL}/${id}`)
        .then(response => response.data.order),
  };
};
