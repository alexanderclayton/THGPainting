import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type Client {
    id: ID!
    name: String!
    address: String!
    email: String!
    phoneNumber: String!
    projects: [Project]
  }
  
  type Project {
    id: ID!
    description: String!
    startDate: Date!
    endDate: Date!
    clientId: ID!
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
    NONE
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String
  }

  type Image {
    url: String
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    getClients: [Client]!
    getClient(id: ID!): Client
    getProjects: [Project]!
    getProject(id: ID!): Project
    getImages: [Image!]!
  }
  
  type Mutation {
    addClient(name: String!, address: String!, email: String!, phoneNumber: String!): Client!
    updateClient(id: ID!, name: String, address: String, email: String, phoneNumber: String): Client
    deleteClient(id: ID!): Client
    addUser(name: String!, email: String!, password: String!, avatar: String): User
    addImage(downloadURL: String!): User
  
    addProject(description: String!, startDate: Date!, endDate: Date, clientId: ID!, projectType: ProjectType!, paid: Boolean!, paymentType: PaymentType, images: [String]): Project
    updateProject(id: ID!, description: String!, startDate: Date, endDate: Date, clientId: ID, projectType: ProjectType, paid: Boolean, paymentType: PaymentType, images: [String]): Project
    deleteProject(id: ID!): Project
  
    register(name: String!, email: String!, password: String!, avatar: String): User!
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;

