export const types = `
  type Discount {
    _id: ID!
    _version: Int
    name: String!
    active: Boolean!
    deleted: Boolean!
    start: String!
    end: String
    percentage: Int!
    updatedAt: String!
    createdAt: String!
    deletedAt: String
    products: [ID]
    categories: [ID]
    getProducts: [Product]
    getCategories: [Category]
  }

  input DiscountInput {
    _id: ID
    _version: Int
    name: String
    active: Boolean
    percentage: Int
    start: String!
    end: String!
    products: [ID]
    categories: [ID]
  }
`;

export const queries = `
  discounts: [Discount]
  discount(id: ID!): Discount
`;

export const mutations = `
  createDiscount(discount: DiscountInput!): Discount
  updateDiscount(id: ID!, discount: DiscountInput!): Discount
  deleteDiscount(id: ID!): Discount
`;
