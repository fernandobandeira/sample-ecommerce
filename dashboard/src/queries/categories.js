import gql from 'graphql-tag';

export const qCategories = gql`
  query {
    categories {
      _id
      active
      name
      description
      discounts {
        _id
      }
      deleted
    }
  }
`;
