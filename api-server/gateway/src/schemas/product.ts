export const types = `
  type Product {
    _id: ID!
    _version: Int
    name: String!
    active: Boolean!
    deleted: Boolean!
    price: Float!
    description: String
    slug: String!
    updatedAt: String!
    createdAt: String!
    deletedAt: String
  }
`;

export const queries = `
  listProducts: [Product]
  getProduct(id: ID!): Product
`;

export const mutations = `
`;
