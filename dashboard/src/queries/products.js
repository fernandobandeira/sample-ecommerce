import gql from 'graphql-tag';

export const fProduct = gql`
  fragment productFragment on Product {
    _id
    active
    name
    slug
    price
    description
    categories
    discounts
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
