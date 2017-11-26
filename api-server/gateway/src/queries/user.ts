import axios from 'axios';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

export default (baseURL) => {
  return {
    users: () =>
      axios.get(`${baseURL}/`)
        .then(response => response.data.users),
    user: (root, { username }) =>
      axios.get(`${baseURL}/${username}`)
        .then(response => response.data.user),
    getToken: (root, { user }) => {
      return axios.get(`${baseURL}/${user.username}`)
        .then(response => 
          argon2.verify(response.data.user.password, user.password)
            .then(match => match ? jwt.sign(
              {
                _id: response.data.user._id,
                username: response.data.user.username,
                admin: response.data.user.admin,
              },
              'secretHere',
              {
                expiresIn: '24h',
              },
            ) : '',
          ),
        );
    },
  };
};
