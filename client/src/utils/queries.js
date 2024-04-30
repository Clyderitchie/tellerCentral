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

export const QUERY_TELLERS = gql`
query getAllTellers {
  getAllTellers {
    _id
    username
    email
    locationId
  }
}
`;

// Client
export const QUERY_CLIENTS = gql`
query getAllClients {
  getAllClients {
    _id
    firstName
    lastName
    email
    address
    phoneNumber
  }
}
`;

export const QUERY_CLIENT = gql`
query getClient($clientId: ID, $firstName: String, $lastName: String, $email: String, $address: String, $phoneNumber: String, $tin: String) {
  getClient(clientId: $clientId, firstName: $firstName, lastName: $lastName, email: $email, address: $address, phoneNumber: $phoneNumber, tin: $tin) {
    _id
    firstName
    lastName
    email
    address
    phoneNumber
    tin
    accounts {
      _id
      accountType
      balance
    }
    services {
      _id
      debitCard
      checks
      onlineBanking
      creditCard
    }
    loans {
      _id
      lineOfCredit
      auto
    }
  }
}
`;