import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
query {
    getClients {
      id
      name
      address
      email
      phoneNumber
    }
  }
`

export const GET_CLIENT = gql`
  query GetClient($name: String!) {
    getClient(name: $name) {
      id
      name
      address
      email
      phoneNumber
    }
  }
`;