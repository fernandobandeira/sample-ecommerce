import gql from 'graphql-tag';

export const fDiscount= gql`
  fragment discountFragment on Discount {
    _id
    active
    name
    start
    end
    percentage
    deleted
  }
`;

export const qDiscounts = gql`
  query {
    discounts {
      ...discountFragment
    }
  }

  ${fDiscount}
`;

export const qDiscount = gql`
  query discount($id: ID!) {
    discount(id: $id) {
      ...discountFragment
    }
  }

  ${fDiscount}
`;
