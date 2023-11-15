import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
        email
        username
        id
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;