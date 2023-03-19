import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
query {
    getClients {
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
      name
      address
      email
      phoneNumber
    }
  }
`;