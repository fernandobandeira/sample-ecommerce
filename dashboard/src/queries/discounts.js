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
    categories
    products
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

export const mCreateDiscount = gql`
  mutation createDiscount($discount: DiscountInput!) {
    createDiscount(discount: $discount) {
      ...discountFragment
    }
  }

  ${fDiscount}
`;

export const mUpdateDiscount = gql`
  mutation updateDiscount($id: ID!, $discount: DiscountInput!) {
    updateDiscount(id: $id, discount: $discount) {
      ...discountFragment
    }
  }

  ${fDiscount}
`;

export const mUpdateDiscountCategories = gql`
  mutation updateDiscountCategories($id: ID!, $categories: [ID]!) {
    updateDiscountCategories(id: $id, categories: $categories) {
      _id
      discounts
    }
  }
`;

export const mUpdateDiscountProducts = gql`
  mutation updateDiscountProducts($id: ID!, $products: [ID]!) {
    updateDiscountProducts(id: $id, products: $products) {
      _id
      discounts
    }
  }
`;
