export const types = `
  type User {
    _id: ID!
    _version: Int
    username: String!    
    admin: Boolean!
    deleted: Boolean!
    updatedAt: String!
    createdAt: String!
    deletedAt: String
  }

  input UserInput {
    _id: ID
    _version: Int
    username: String
    password: String
    admin: Boolean
  }
`;

export const queries = `
  users: [User]
  user(username: String!): User
  getToken(user: UserInput): String
`;

export const mutations = `
  createUser(user: UserInput!): User
  updateUser(id: ID!, user: UserInput!): User
  deleteUser(id: ID!): User
`;
