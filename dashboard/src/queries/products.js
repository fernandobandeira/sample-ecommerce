import gql from 'graphql-tag';

export const fProduct = gql`
  fragment productFragment on Product {
    _id
    active
    name
    price
    description
    categories {
      _id
    }
    discounts {
      _id
    }
    deleted
  }
`;

export const qProducts = gql`
  query {
    products {
      ...productFragment
    }
  }

  ${fProduct}
`;

export const qProduct = gql`
  query product($id: ID!) {
    product(id: $id) {
      ...productFragment
    }
  }

  ${fProduct}
`;
