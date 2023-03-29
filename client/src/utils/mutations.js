import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!, 
    $address: String!, 
    $email: String!, 
    $phoneNumber: String!
    ) {
      addClient(
        name: $name, 
        address: $address, 
        email: $email, 
        phoneNumber: $phoneNumber
        ) {
          id
          name
          address
          email
          phoneNumber
          }
      }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $description: String!
    $startDate: Date!
    $endDate: Date
    $clientId: ID!
    $projectType: ProjectType!
    $paid: Boolean!
    $paymentType: PaymentType!
    $images: [String]
    ) {
      addProject(
        description: $description
        startDate: $startDate
        endDate: $endDate
        clientId: $clientId
        projectType: $projectType
        paid: $paid
        paymentType: $paymentType
        images: $images
        ) {
          id
          description
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

export const LOGIN_USER = gql`
      mutation login(
        $email: String!
        $password: String!
      ) {
        login(
          email: $email
          password: $password
        ) {
          token
          user {
            email
            password
          }
        }
      }
`

