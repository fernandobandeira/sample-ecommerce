import gql from 'graphql-tag';

export const fProduct = gql`
  fragment productFragment on Product {
    _id
    active
    name
    slug
    price
    dPrice
    description
    categories
    validDiscounts {
      _id
      name
      percentage
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
