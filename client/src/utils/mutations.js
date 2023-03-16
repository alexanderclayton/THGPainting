import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation addClient($name: String!, $address: String!, $email: String!, $phoneNumber: String!) {
    AddClient(name: $name, address: $address, email: $email, phoneNumber: $phoneNumber) {
      id
      name
      address
      email
      phoneNumber
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($startDate: String!, $endDate: String, $clientId: ID!, $projectType: ProjectType!, $paid: Boolean!, $paymentType: paymentType, $images: [String]) {
    AddProject(startDate: $startDate, endDate: $endDate, clientId: $clientId, projectType: $projectType, paid: $paid, paymentType: paymentType, images: $images) {
      id
      startDate
      endDate
      clientId
      projectType
      paid
      paymentType
      images
    }
  }
`;

