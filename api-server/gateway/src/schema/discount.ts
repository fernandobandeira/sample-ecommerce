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
    products: [Product]
    categories: [Category]
  }
`;

export const queries = `
  discounts: [Discount]
  discount(id: ID!): Discount
`;

export const mutations = `
`;
