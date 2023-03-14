const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Client {
    id: ID!
    name: String!
    address: String!
    email: String!
    phone: String!
    projects: [Project]
  }
  
  type Project {
    id: ID!
    startDate: String!
    endDate: String
    client: Client!
    projectType: ProjectType!
    paid: Boolean!
    paymentType: PaymentType!
    images: [String]
  }
  
  enum ProjectType {
    PAINTING
    CHRISTMAS_LIGHTS
    OTHER
  }
  
  enum PaymentType {
    CASH
    CHECK
    VENMO
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String
  }
  
  type Query {
    getClients: [Client]!
    getClient(id: ID!): Client
    getProjects: [Project]!
    getProject(id: ID!): Project
  }
  
  type Mutation {
    addClient(name: String!, address: String!, email: String!, phone: String!): Client!
    updateClient(id: ID!, name: String, address: String, email: String, phone: String): Client
    deleteClient(id: ID!): Client
  
    addProject(startDate: String!, endDate: String, clientId: ID!, projectType: ProjectType!, paid: Boolean!, paymentType: PaymentType!, images: [String]): Project!
    updateProject(id: ID!, startDate: String, endDate: String, clientId: ID, projectType: ProjectType, paid: Boolean, paymentType: PaymentType, images: [String]): Project
    deleteProject(id: ID!): Project
  
    register(name: String!, email: String!, password: String!, avatar: String): User!
    login(email: String!, password: String!): User!
  }
  
`;

module.exports = typeDefs;