import gql from 'graphql-tag';

export const fCategory= gql`
  fragment categoryFragment on Category {
    _id
    active
    name
    slug
    description
    discounts {
      _id
    }
    deleted
  }
`;

export const qCategories = gql`
  query {
    categories {
      ...categoryFragment
    }
  }

  ${fCategory}
`;

export const qCategory = gql`
  query category($id: ID!) {
    category(id: $id) {
      ...categoryFragment
    }
  }

  ${fCategory}
`;
