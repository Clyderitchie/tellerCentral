import { gql } from '@apollo/client';

// Login
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}`; 