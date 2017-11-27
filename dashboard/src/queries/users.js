import gql from 'graphql-tag';

export const qUsers = gql`
  query {
    users {
      username
    }
  }
`;
