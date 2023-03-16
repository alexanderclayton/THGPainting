import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation AddClient($name: String!, $address: String!, $email: String!, $phoneNumber: String!) {
    addClient(name: $name, address: $address, email: $email, phoneNumber: $phoneNumber) {
      id
      name
      address
      email
      phoneNumber
    }
  }
`;

