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