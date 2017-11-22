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
    discounts: [Discount]
    validDiscounts: [Discount]
  }

  input ProductInput {
    _id: ID
    _version: Int
    name: String!
    active: Boolean
    price: Float
    description: String
    categories: [ID]
    discounts: [ID]
  }
`;

export const queries = `
  products: [Product]
  product(id: ID!): Product
  categoryProducts(id: ID!): [Product]
  discountProducts(id: ID!): [Product]
`;

export const mutations = `
  createProduct(product: ProductInput!): Product
  updateProduct(id: ID!, product: ProductInput!): Product
  deleteProduct(id: ID!): Product
`;
