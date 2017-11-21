export const types = `
  type Category {
    _id: ID!
    _version: Int
    name: String!
    active: Boolean!
    deleted: Boolean!
    description: String
    slug: String!
    updatedAt: String!
    createdAt: String!
    deletedAt: String
    products: [Product]
    discounts: [Discount]
  }
`;

export const queries = `
  categories: [Category]
  category(id: ID!): Category
  discountCategories(id: ID!): [Category]
`;

export const mutations = `
`;
