import gql from 'graphql-tag';

export const qOrders = gql`
  query {
    orders {
      _id
      products {
        _id
        name
        dPrice
      }
      user {
        _id
        username
      }
      createdAt
    }
  }
`;
