export const types = `
type Order {
  _id: ID!
  _version: Int
  products: [ProductOrder]
  user: User
  deleted: Boolean!
  updatedAt: String!
  createdAt: String!
  deletedAt: String
}

type ProductOrder {
  _id: ID!
  _version: Int
  name: String!
  active: Boolean
  deleted: Boolean
  price: Float!  
  description: String
  slug: String
  categories: [ID]
  validDiscounts: [Discount]
  dPrice: Float!
}

input ProductOrderInput {
  _id: ID!
  _version: Int
  name: String!
  active: Boolean
  deleted: Boolean
  price: Float!  
  description: String
  slug: String
  categories: [ID]
  validDiscounts: [DiscountInput]
  dPrice: Float!
}

input OrderInput {
  _id: ID
  _version: Int
  products: [ProductOrderInput]
  user: UserInput
}
`;

export const queries = `
  orders: [Order]
  order(id: ID!): Order
`;

export const mutations = `
  createOrder(order: OrderInput!): Order
`;
