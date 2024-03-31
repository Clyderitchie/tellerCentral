import { gql } from '@apollo/client';

// Teller
export const QUERY_TELLER = gql`
query getTeller($tellerId: ID) {
  getTeller(tellerId: $tellerId) {
    username
    email
    locationId
  }
}
`;

export const QUERY_TELLERS =gql`
query getAllTellers {
  getAllTellers {
    _id
    username
    email
    locationId
  }
}`;