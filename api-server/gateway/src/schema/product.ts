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
    categories: [Category]
  }
`;

export const queries = `
  products: [Product]
  product(id: ID!): Product
`;

export const mutations = `
`;
